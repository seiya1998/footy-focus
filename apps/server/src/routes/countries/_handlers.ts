import { FastifyInstance } from 'fastify'

export default async (fastify: FastifyInstance) => {
    fastify.get('/', {}, async (request, reply) => {
        return { hello: 'world' }
    })
}