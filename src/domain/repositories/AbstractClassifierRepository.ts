import { Classifier } from "../entity/Classifier";

export abstract class AbstractClassifierRepository {
    abstract readOneById(id: string): Promise<Classifier|null>
}