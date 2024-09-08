import { PrismaClient } from '@prisma/client'
import { season } from './season'
import { country } from './country'
import { competition } from './competition'
import { user } from './user'
import { team } from './team'
import { venue } from './venue'
import { city } from './city'
import { player } from './player'
import { teamCompetitionSeason } from './teamCompetitionSeason'
import { teamPlayerSeason } from './teamPlayerSeason'

const prisma = new PrismaClient()

export const main = async () => {
    try {
        // トランザクションを使ってデータを登録
        await prisma.$transaction(async (prisma) => {
            await user(prisma)
            await season(prisma)
            await country(prisma)
            await city(prisma)
            await competition(prisma)
            await venue(prisma)
            await team(prisma)
            await player(prisma)
            await teamCompetitionSeason(prisma)
            await teamPlayerSeason(prisma)
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