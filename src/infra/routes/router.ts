import Elysia from "elysia";
import { ClasssifierController } from "../../controllers";
import { classifySchema } from "../middlewares/schema";

const classsifierController = new ClasssifierController()

export function router(app: Elysia) {
    return () => app
        .post("/classify", classsifierController.classify, classifySchema)
}