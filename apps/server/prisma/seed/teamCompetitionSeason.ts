import { Prisma } from '@prisma/client'
import { getDataFromCsv } from './common/getDataFromCsv';
import { generateMapFromDB } from './common/generateDataMap';
import { 
    getSeasonsFromDB,
    getTeamsFromDB,
    getCompetitionsFromDB
} from './common/getDataFromDB';

export const teamCompetitionSeason = async (prisma: Prisma.TransactionClient) => {
    // バッチサイズを定義
    const BATCH_SIZE = 500;

    const teamCompetitionSeasons = getDataFromCsv('team_competition_seasons');

    // バルクインサート用にデータをマップに変換
    const seasonMap = await generateMapFromDB(
        getSeasonsFromDB,
        season => season.name,
        prisma
    );
    const teamMap = await generateMapFromDB(
        getTeamsFromDB,
        team => team.teamId,
        prisma
    );
    const competitionMap = await generateMapFromDB(
        getCompetitionsFromDB,
        competition => competition.competitionId,
        prisma
    );

    const teamData = teamCompetitionSeasons.map((team: string[]) => {
        return {
            seasonId: seasonMap.get(team[0]),
            teamId: teamMap.get(Number(team[1])),
            competitionId: competitionMap.get(Number(team[2])),
        }
    });

    // Promise.allを使って並行処理
    const tasks = [];
    for (let i = 0; i < teamData.length; i += BATCH_SIZE) {
        tasks.push(
            prisma.rTeamCompetitionSeason.createMany({
                data: teamData.slice(i, i + BATCH_SIZE),
            })
        );
    }
    
    await Promise.all(tasks);
}