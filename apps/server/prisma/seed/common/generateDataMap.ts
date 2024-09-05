import { Prisma } from '@prisma/client'
import { getCountriesFromDB, getCitiesFromDB, getVenuesFromDB } from './getDataFromDB';

export const generateCountryMap = async (prisma: Prisma.TransactionClient) => {
    const countries = await getCountriesFromDB(prisma);

    // 国データをマップに変換（名前をキーにしてIDを値にする）
    const countryMap = new Map<string, number>();
    countries.forEach(country => {
        countryMap.set(country.name, country.id);
    });
    return countryMap;
}

export const generateCityMap = async (prisma: Prisma.TransactionClient) => {
    const cities = await getCitiesFromDB(prisma);

    // 国データをマップに変換（名前をキーにしてIDを値にする）
    const cityMap = new Map<string, number>();
    cities.forEach(city => {
        cityMap.set(city.name, city.id);
    });
    return cityMap;
}

export const generateVenueMap = async (prisma: Prisma.TransactionClient) => {
    const venues = await getVenuesFromDB(prisma);

    // 国データをマップに変換（名前をキーにしてIDを値にする）
    const venueMap = new Map<string, number>();
    venues.forEach(venue => {
        venueMap.set(venue.name, venue.id);
    });
    return venueMap;
}

