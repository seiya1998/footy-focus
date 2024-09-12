import { FastifyInstance } from 'fastify'
import { dbMiddleware } from '@/utils';
import { getCountriesFromDB } from './getCountriesFromDB';

export default async function (fastify: FastifyInstance) {
    fastify.get(
        '/', 
        {}, 
        async (request, reply) => {
            const getCountries = dbMiddleware(getCountriesFromDB);
            return getCountries();
        }
    );
}