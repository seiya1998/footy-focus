import { FastifyRequest } from 'fastify';
import type { Result } from '@/utils';

export const extractParams = (
    request: FastifyRequest<{
        Querystring: { id?: string };
    }>
): Result<{ id: string }, { errorCode: 400 }> => {
    const id = request.query?.id;

    return { success: true, data: { id } }
};