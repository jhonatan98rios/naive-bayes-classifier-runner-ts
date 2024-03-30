import { Classifier } from "../../domain/entity/Classifier";
import { AbstractClassifierRepository } from "../../domain/repositories/AbstractClassifierRepository";
import { IClassifierModel, ClassifierModel } from "../models/Classifier.schema";


export class MongoDBClassifierRepository implements AbstractClassifierRepository {

    private classifierModel: IClassifierModel

    constructor() {
        this.classifierModel = ClassifierModel.getInstance()
    }

    async readOneById(id: string): Promise<Classifier | null> {
        const foundClassifier = await this.classifierModel.findOne({ id })
        return foundClassifier
    }
}