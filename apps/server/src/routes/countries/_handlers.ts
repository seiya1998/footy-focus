import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { pipe } from 'ramda';
import { match, P } from 'ts-pattern';
import { extractParams } from './extractParams';
import { getCountriesFromDB } from './getCountriesFromDB';
import { start, bypass, dbMiddleware } from '@/utils';
import { schemas } from './schema';

export default async function (fastify: FastifyInstance) {
    /* 
    * GET /countries
    */
    fastify.get(
        '/',
        {
            schema: schemas['get']
        },
        async (
            request: FastifyRequest<{
                Querystring: {
                    id: string;
                };}>,
            reply: FastifyReply
        ) => {
            const getCountries = dbMiddleware(getCountriesFromDB);
            return pipe(
                start(extractParams(request)),
                bypass(getCountries),
                async (result) => {
                    const res = await result;
                    match(res)
                        .with({ error: { errorCode: 400 } }, () => {
                            return reply.code(400).send({ error: 'Bad Request' });
                        })
                        .with({ error: { errorCode: 401 } }, () => {
                            return reply.code(401).send({ error: 'idが不正です' });
                        })
                        .with({ error: { errorCode: 403 } }, () => {
                            return reply.code(403).send({ error: '権限がありません' });
                        })
                        .with({ error: { errorCode: 500 } }, () => {
                            return reply.code(500).send({ error: 'Internal Server Error' });
                        })
                        .with({ success: true }, ({data}) => {
                            return reply.code(200).send(data);
                        })
                        .exhaustive();
                    }
            )();
        }
    );
}