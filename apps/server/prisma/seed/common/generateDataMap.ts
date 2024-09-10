import { Prisma } from '@prisma/client'
import { 
    getCountriesFromDB, 
    getVenuesFromDB, 
    getCompetitionsFromDB,
    getSeasonsFromDB,
    getTeamsFromDB,
    getPlayersFromDB,
    getTeamCompetitionSeasonsFromDB
} from './getDataFromDB';

export const generateCountryMap = async (prisma: Prisma.TransactionClient) => {
    const countries = await getCountriesFromDB(prisma);

    const countryMap = new Map<string, string>();
    countries.forEach(country => {
        countryMap.set(country.name, country.id);
    });
    return countryMap;
}

export const generateCompetitionMap = async (prisma: Prisma.TransactionClient) => {
    const competitions = await getCompetitionsFromDB(prisma);

    const competitionMap = new Map<string, string>();
    competitions.forEach(competition => {
        competitionMap.set(competition.name, competition.id);
    });
    return competitionMap;
}

export const generateCompetitionIdMap = async (prisma: Prisma.TransactionClient) => {
    const competitions = await getCompetitionsFromDB(prisma);

    const competitionMap = new Map<Number, string>();
    competitions.forEach(competition => {
        competitionMap.set(competition.competitionId, competition.id);
    });
    return competitionMap;
}

export const generateVenueMap = async (prisma: Prisma.TransactionClient) => {
    const venues = await getVenuesFromDB(prisma);

    const venueMap = new Map<string, string>();
    venues.forEach(venue => {
        venueMap.set(venue.name, venue.id);
    });
    return venueMap;
}

export const generateSeasonMap = async (prisma: Prisma.TransactionClient) => {
    const seasons = await getSeasonsFromDB(prisma);

    const seasonMap = new Map<string, string>();
    seasons.forEach(season => {
        seasonMap.set(season.name, season.id);
    });
    return seasonMap;
}

export const generateTeamMap = async (prisma: Prisma.TransactionClient) => {
    const teams = await getTeamsFromDB(prisma);

    const teamMap = new Map<Number, string>();
    teams.forEach(team => {
        teamMap.set(team.teamId, team.id);
    });
    return teamMap;
}

export const generatePlayerMap = async (prisma: Prisma.TransactionClient) => {
    const players = await getPlayersFromDB(prisma);

    const playerMap = new Map<Number, string>();
    players.forEach(player => {
        playerMap.set(player.playerId, player.id);
    });
    return playerMap;
}

export const generateTeamCompetitionSeasonMap = async (prisma: Prisma.TransactionClient) => {
    const teams = await getTeamCompetitionSeasonsFromDB(prisma);

    const teamMap = new Map<string, string>();
    teams.forEach(team => {
        teamMap.set(team.competitionId, team.id);
    });
    return teamMap;
}