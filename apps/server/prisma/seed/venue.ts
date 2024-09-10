import { Prisma } from '@prisma/client'
import { getDataFromCsv } from './common/getDataFromCsv';
import { generateCountryMap } from './common/generateDataMap';

export const venue = async (prisma: Prisma.TransactionClient) => {
    // バッチサイズを定義
    const BATCH_SIZE = 1000;

    const venues = getDataFromCsv('venues');

    // バルクインサート用にデータをマップに変換
    const countryMap = await generateCountryMap(prisma);

    const venueData = venues.map((venue: string[]) => {
        return {
            countryId: countryMap.get(venue[1]),
            city: venue[0],
            name: venue[2],
            japaneseName: venue[3],
            address: venue[4],
            capacity: parseInt(venue[5]),
            imageUrl: venue[6],
        }
    });

    // バルクインサート
    for (let i = 0; i < venueData.length; i += BATCH_SIZE) {
        await prisma.rVenue.createMany({
            data: venueData.slice(i, i + BATCH_SIZE)
        });
    }
}