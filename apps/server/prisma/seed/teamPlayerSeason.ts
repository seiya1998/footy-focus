import { Prisma } from '@prisma/client'
import { getDataFromCsv } from './common/getDataFromCsv';
import { 
    generateSeasonMap, 
    generatePlayerMap,
    generateCompetitionIdMap,
    generateTeamCompetitionSeasonMap
} from './common/generateDataMap';

export const teamPlayerSeason = async (prisma: Prisma.TransactionClient) => {
    // バッチサイズを定義
    const BATCH_SIZE = 1000;

    const teamPlayerSeasons = getDataFromCsv('team_player_seasons');

    // バルクインサート用にデータをマップに変換
    const seasonMap = await generateSeasonMap(prisma);
    const playerMap = await generatePlayerMap(prisma);
    const competitionMap = await generateCompetitionIdMap(prisma);
    const teamMap = await generateTeamCompetitionSeasonMap(prisma);

    const playerData = teamPlayerSeasons.map((player: string[]) => {
        const competitionId = competitionMap.get(Number(player[13]));
        return {
            seasonId: seasonMap.get(player[12]),
            teamCompetitionSeasonId: teamMap.get(competitionId),
            playerId: playerMap.get(Number(player[1])),
        }
    });

    // バルクインサート
    for (let i = 0; i < playerData.length; i += BATCH_SIZE) {
        await prisma.rTeamPlayerSeason.createMany({
            data: playerData.slice(i, i + BATCH_SIZE)
        });
    }
}