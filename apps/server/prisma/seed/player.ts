import { Prisma } from '@prisma/client'
import { getDataFromCsv } from './common/getDataFromCsv';
import { generateCountryMap } from './common/generateDataMap';

export const player = async (prisma: Prisma.TransactionClient) => {
    // バッチサイズを定義
    const BATCH_SIZE = 1000;

    const players = getDataFromCsv('players');

    // バルクインサート用にデータをマップに変換
    const countryMap = await generateCountryMap(prisma);

    const playerData = players.map((player: string[]) => {
        return {
            countryId: countryMap.get(player[0]),
            playerId: Number(player[1]),
            name: player[2],
            firstName: player[3],
            lastName: player[5],
            age: player[7],
            birthDate: player[8],
            height: player[9],
            weight: player[10],
            photoUrl: player[11],
        }
    });

    // バルクインサート
    for (let i = 0; i < playerData.length; i += BATCH_SIZE) {
        await prisma.rPlayer.createMany({
            data: playerData.slice(i, i + BATCH_SIZE)
        });
    }
}