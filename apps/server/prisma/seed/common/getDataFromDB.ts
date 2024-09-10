import { Prisma } from '@prisma/client'

export const getCountriesFromDB = async (prisma: Prisma.TransactionClient) => {
    return await prisma.rCountry.findMany()
}

export const getVenuesFromDB = async (prisma: Prisma.TransactionClient) => {
    return await prisma.rVenue.findMany()
}

export const getSeasonsFromDB = async (prisma: Prisma.TransactionClient) => {
    return await prisma.rSeason.findMany()
}

export const getCompetitionsFromDB = async (prisma: Prisma.TransactionClient) => {
    return await prisma.rCompetition.findMany()
}

export const getTeamsFromDB = async (prisma: Prisma.TransactionClient) => {
    return await prisma.rTeam.findMany()
}

export const getPlayersFromDB = async (prisma: Prisma.TransactionClient) => {
    return await prisma.rPlayer.findMany()
}

export const getTeamCompetitionSeasonsFromDB = async (prisma: Prisma.TransactionClient) => {
    return await prisma.rTeamCompetitionSeason.findMany()
}