import { t } from 'elysia'

export const classifySchema = {
    body: t.Object({
        id: t.String(),
        sample: t.String()
    })
}

