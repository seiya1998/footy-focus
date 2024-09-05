import { Prisma } from '@prisma/client'
import { getDataFromCsv } from './common/getDataFromCsv';
import { generateCountryMap } from './common/generateDataMap';

export const city = async (prisma: Prisma.TransactionClient) => {
    // バッチサイズを定義
    const BATCH_SIZE = 1000;

    const cities = getDataFromCsv('cities');

    // バルクインサート用に国データをマップに変換
    const countryMap = await generateCountryMap(prisma);

    const cityData = cities.map((city: string[]) => {
        return {
            countryId: countryMap.get(city[0]), // マップからIDを取得
            name: city[1],
            japaneseName: city[2],
        }
    });

    // バルクインサート
    for (let i = 0; i < cityData.length; i += BATCH_SIZE) {
        await prisma.rCity.createMany({
            data: cityData.slice(i, i + BATCH_SIZE)
        });
    }
}