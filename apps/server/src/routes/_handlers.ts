import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export default async function (fastify: FastifyInstance) {
    fastify.get(
        '/',
        {},
        async (_: FastifyRequest, reply: FastifyReply) => {
            console.log('HealthCheck OK!');
            return reply.code(200).send({ message: 'HealthCheck OK!' });
        }
    );
}