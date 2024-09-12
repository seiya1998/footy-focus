import { Prisma } from '@prisma/client'
import { getDataFromCsv } from './common/getDataFromCsv';
import { generateMapFromDB } from './common/generateDataMap';
import { getCountriesFromDB, getVenuesFromDB } from './common/getDataFromDB';

export const team = async (prisma: Prisma.TransactionClient) => {
    // バッチサイズを定義
    const BATCH_SIZE = 1000;

    const teams = getDataFromCsv('teams');

    // バルクインサート用にデータをマップに変換
    const countryMap = await generateMapFromDB(
        getCountriesFromDB,
        country => country.name,
        prisma
    );
    const venueMap = await generateMapFromDB(
        getVenuesFromDB,
        venue => venue.name,
        prisma
    );

    const teamData = teams.map((team: string[]) => {
        return {
            countryId: countryMap.get(team[0]),
            venueId: venueMap.get(team[1]),
            teamId: Number(team[2]),
            name: team[3],
            japaneseName: team[4],
            code: team[5],
            founded: Number(team[6]),
            national: parseInt(team[7]) === 1,
            logoUrl: team[8],
        }
    });

    // バルクインサート
    for (let i = 0; i < teamData.length; i += BATCH_SIZE) {
        await prisma.rTeam.createMany({
            data: teamData.slice(i, i + BATCH_SIZE)
        });
    }
}