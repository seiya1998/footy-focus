import { Prisma } from '@prisma/client'
import { getDataFromCsv } from './common/getDataFromCsv';
import { generateMapFromDB } from './common/generateDataMap';
import { 
    getSeasonsFromDB,
    getTeamCompetitionSeasonsFromDB,
    getPlayersFromDB,
    getCompetitionsFromDB
} from './common/getDataFromDB';

export const teamPlayerSeason = async (prisma: Prisma.TransactionClient) => {
    // バッチサイズを定義
    const BATCH_SIZE = 500;

    const teamPlayerSeasons = getDataFromCsv('team_player_seasons');

    // バルクインサート用にデータをマップに変換
    const seasonMap = await generateMapFromDB(
        getSeasonsFromDB,
        season => season.name,
        prisma
    );
    const playerMap = await generateMapFromDB(
        getPlayersFromDB,
        player => player.playerId,
        prisma
    );
    const competitionMap = await generateMapFromDB(
        getCompetitionsFromDB,
        competition => competition.competitionId,
        prisma
    );
    const teamMap = await generateMapFromDB(
        getTeamCompetitionSeasonsFromDB,
        team => team.competitionId,
        prisma
    );

    const playerData = teamPlayerSeasons.map((player: string[]) => {
        const competitionId = competitionMap.get(Number(player[13]));
        return {
            seasonId: seasonMap.get(player[12]),
            teamCompetitionSeasonId: teamMap.get(competitionId),
            playerId: playerMap.get(Number(player[1])),
        }
    });

    // Promise.allを使って並行処理
    const tasks = [];
    for (let i = 0; i < playerData.length; i += BATCH_SIZE) {
        tasks.push(
            prisma.rTeamPlayerSeason.createMany({
                data: playerData.slice(i, i + BATCH_SIZE),
            })
        );
    }
    
    await Promise.all(tasks);
}