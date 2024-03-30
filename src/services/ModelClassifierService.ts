import { BayesClassifier } from 'natural'
import { AbstractClassifierRepository } from '../domain/repositories/AbstractClassifierRepository'
import { AbstractStorageProvider } from '../domain/providers/AbstractStorageProvider'
import { handlePromise } from '../utils/handlePromise'
import { Classifier } from '../domain/entity/Classifier'
import { ClassifyDto } from '../domain/dtos/classify.dto'
import { InternalServerError, NotFoundError, ParseError } from 'elysia'

export class ModelClassifierService {

    constructor(private classifierRepository: AbstractClassifierRepository, private storageProvider: AbstractStorageProvider) {}

    public async execute(body: ClassifyDto) {

        const { sample, id } = body
        
        const [readOneByIdError, foundClassifier] = await handlePromise<Classifier>(this.classifierRepository.readOneById(id))
        if (readOneByIdError || !foundClassifier) throw new NotFoundError(`Model does not exist: ${readOneByIdError}`)

        const [getObjectError, object] = await handlePromise<Uint8Array>(this.storageProvider.getObject(foundClassifier.path))
        if (getObjectError) throw new NotFoundError(`S3 object does not exist: ${getObjectError}`)
        
        const classifier = this.getClassifierFromObject(object)

        const classification = this.executeClassification(classifier, sample)
        
        return classification
    }

    private getClassifierFromObject(object: Uint8Array) {
        try {
            const stringifiedModel = Buffer.from(object).toString()
            const classifier = BayesClassifier.restore(JSON.parse(stringifiedModel))
            return classifier
        } catch (err) {
            throw new ParseError(`Error while parsing: ${err}`)
        }
    }

    private executeClassification(classifier: BayesClassifier, sample: string) {
        try {
            const result = classifier.classify(sample)
            return { classification: result }
        } catch (err) {
            throw new InternalServerError(`Error to classify: ${err}`)
        }
    }
}
