import { handlePromise } from "../../utils/handlePromise"

type AuthData = {
    email: string
    error?: string
}

function handleAuthError(set: any) {
    console.log("Error authenticating the user")
    return set.status = 'Unauthorized'
}

export async function beforeHandle({ headers, set }: any) {

    const [err, res] = await handlePromise<Response>(fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${headers.authorization}`))
    if (err) return handleAuthError(set)

    const [error, data] = await handlePromise<AuthData>(await res.json())
    if (error) return handleAuthError(set)

    if(!data || data.error == "invalid_token") return handleAuthError(set)
    
    set.username = data.email
}