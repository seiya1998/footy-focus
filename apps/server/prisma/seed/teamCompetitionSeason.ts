import { Prisma } from '@prisma/client'
import { getDataFromCsv } from './common/getDataFromCsv';
import { 
    generateSeasonMap, 
    generateTeamMap,
} from './common/generateDataMap';

export const teamCompetitionSeason = async (prisma: Prisma.TransactionClient) => {
    // バッチサイズを定義
    const BATCH_SIZE = 1000;

    const teamCompetitionSeasons = getDataFromCsv('team_competition_seasons');

    // バルクインサート用にデータをマップに変換
    const seasonMap = await generateSeasonMap(prisma);
    const teamMap = await generateTeamMap(prisma);

    const playerData = teamCompetitionSeasons.map((team: string[]) => {
        return {
            seasonId: seasonMap.get(team[0]),
            teamId: teamMap.get(Number(team[1])),
            competitionId: team[2],
        }
    });

    // バルクインサート
    for (let i = 0; i < playerData.length; i += BATCH_SIZE) {
        await prisma.rPlayer.createMany({
            data: playerData.slice(i, i + BATCH_SIZE)
        });
    }
}