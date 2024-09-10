import { Prisma } from '@prisma/client'
import { getDataFromCsv } from './common/getDataFromCsv';
import { 
    generateSeasonMap, 
    generateTeamMap,
    generateCompetitionIdMap
} from './common/generateDataMap';

export const teamCompetitionSeason = async (prisma: Prisma.TransactionClient) => {
    // バッチサイズを定義
    const BATCH_SIZE = 500;

    const teamCompetitionSeasons = getDataFromCsv('team_competition_seasons');

    // バルクインサート用にデータをマップに変換
    const seasonMap = await generateSeasonMap(prisma);
    const teamMap = await generateTeamMap(prisma);
    const competitionMap = await generateCompetitionIdMap(prisma);

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