import { Prisma } from '@prisma/client'
import { getDataFromCsv } from './common/getDataFromCsv';

export const country = async (prisma: Prisma.TransactionClient) => {
    const countries = getDataFromCsv('countries');
    await prisma.rCountry.createMany({
        data: countries.map((country: string[]) => {
            return {
                name: country[1],
                japaneseName: country[2],
                code: country[3],
                flagUrl: country[4],
            }
        })
    })
}