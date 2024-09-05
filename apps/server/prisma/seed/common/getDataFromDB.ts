import { Prisma } from '@prisma/client'

export const getCountriesFromDB = async (prisma: Prisma.TransactionClient) => {
    return await prisma.rCountry.findMany()
}

export const getCitiesFromDB = async (prisma: Prisma.TransactionClient) => {
    return await prisma.rCity.findMany()
}

export const getVenuesFromDB = async (prisma: Prisma.TransactionClient) => {
    return await prisma.rVenue.findMany()
}