import { PrismaClient } from '@prisma/client'
import { season } from './season'
import { country } from './country'
import { competition } from './competition'
import { user } from './user'

const prisma = new PrismaClient()

export const main = async () => {
    try {
        // トランザクションを使ってデータを登録
        await prisma.$transaction(async (prisma) => {
            await user(prisma)
            await season(prisma)
            await country(prisma)
            await competition(prisma)
        })
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })