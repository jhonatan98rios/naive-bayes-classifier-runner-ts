import { MongoDBClassifierRepository } from "../infra/repositories/MongoDBClassifierRepository";
import { ModelClassifierService } from "../services/ModelClassifierService";
import { ClassifyDto } from "../domain/dtos/classify.dto";
import { S3Provider } from "../infra/providers/S3Provider";

export class ClasssifierController {

    public async classify({ body }: { body: ClassifyDto }) {
        console.time('benchmark');
        const classifierRepository = new MongoDBClassifierRepository()
        const storageProvider = new S3Provider()
        const modelClassifierService = new ModelClassifierService(classifierRepository, storageProvider)

        const result = await modelClassifierService.execute(body)
        console.timeEnd('benchmark');
        return result
    }
}