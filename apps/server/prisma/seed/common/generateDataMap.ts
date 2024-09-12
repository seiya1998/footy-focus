import { Prisma } from '@prisma/client'

// Mapを生成する関数を定義
// この関数は、Promiseを受け取り、Mapを返す
// K は Map のキーの型
export const generateMapFromDB = async <T, K>(
    getDataFromDB: (prisma: Prisma.TransactionClient) => Promise<T[]>,
    keySelector: (item: T) => K,
    prisma: Prisma.TransactionClient
): Promise<Map<K, string>> => {
    const data = await getDataFromDB(prisma);

    const map = new Map<K, string>();
    data.forEach((item: any) => {
        map.set(keySelector(item), item.id);
    });
    return map;
}