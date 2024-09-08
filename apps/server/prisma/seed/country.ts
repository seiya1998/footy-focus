import { Prisma } from '@prisma/client'
import { getDataFromCsv } from './common/getDataFromCsv';

export const country = async (prisma: Prisma.TransactionClient) => {
    const countries = getDataFromCsv('countries');
    await prisma.rCountry.createMany({
        data: countries.map((country: string[]) => {
            return {
                name: country[0],
                japaneseName: country[1],
                code: country[2],
                flagUrl: country[3],
            }
        })
    })
}