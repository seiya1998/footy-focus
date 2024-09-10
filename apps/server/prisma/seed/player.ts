import { Prisma } from '@prisma/client'
import { getDataFromCsv } from './common/getDataFromCsv';

export const player = async (prisma: Prisma.TransactionClient) => {
    // バッチサイズを定義
    const BATCH_SIZE = 500;

    const players = getDataFromCsv('players');

    const playerData = players.map((player: string[]) => {
        return {
            playerId: Number(player[2]),
            name: player[3],
            firstName: player[4],
            lastName: player[6],
            age: Number(player[8]),
            nationality: player[0],
            nationalityJapanese: player[1],
            birthDate: player[9] ? new Date(`${player[9]}T00:00:00Z`).toISOString() : null,
            height: player[10],
            weight: player[11],
            photoUrl: player[12],
        }
    });

    // Promise.allを使って並行処理
    const tasks = [];
    for (let i = 0; i < playerData.length; i += BATCH_SIZE) {
        tasks.push(
            prisma.rPlayer.createMany({
                data: playerData.slice(i, i + BATCH_SIZE),
            })
        );
    }
    
    await Promise.all(tasks);
}