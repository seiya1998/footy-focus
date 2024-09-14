import { JSONSchema } from 'json-schema-to-ts';

export const schemas = {
    /*
    * GET /countries
    */
    get: {
        querystring: {
            type: 'object',
            properties: {
                id: { type: 'string' },
            },
        },
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        japaneseName: { type: 'string' },
                        code: { type: 'string' },
                        flagUrl: { type: 'string' },
                    },
                    required: ['id', 'name', 'japaneseName', 'code', 'flagUrl'],
                }
            } as const satisfies JSONSchema,
            400: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                }
            } as const satisfies JSONSchema,
            401: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                }
            } as const satisfies JSONSchema,
            403: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                }
            } as const satisfies JSONSchema,
            500: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                }
            } as const satisfies JSONSchema
        }
    },
}