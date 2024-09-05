import { Prisma } from '@prisma/client'
import { getDataFromCsv } from './common/getDataFromCsv';

export const competition = async (prisma: Prisma.TransactionClient) => {
    const competitions = getDataFromCsv('competitions');
    await prisma.rCompetition.createMany({
        data: competitions.map((competition: string[]) => {
            return {
                countryId: competition[0],
                competitionId: competition[1],
                association: competition[2],
                name: competition[3],
                japaneseName: competition[4],
                type: competition[5],
                logoUrl: competition[6],
            }
        })
    })
}