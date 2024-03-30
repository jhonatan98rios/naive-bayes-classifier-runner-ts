type Code = "UNKNOWN" | "VALIDATION" | "NOT_FOUND" | "PARSE" | "INTERNAL_SERVER_ERROR" | "INVALID_COOKIE_SIGNATURE"

type IMiddleware = {
    code: Code
    error: Error
    set: any
}

export const handleError = ({ code, error, set }: IMiddleware) => {
    return new Response(error.toString())
}
