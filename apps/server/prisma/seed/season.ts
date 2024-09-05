import { Prisma } from '@prisma/client'

export const season = async (prisma: Prisma.TransactionClient) => {
    await prisma.rSeason.createMany({
        data: [
            { name: '2023' },
            { name: '2024' },
        ]
    })
}