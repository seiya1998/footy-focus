import { Prisma } from "@/lib";
import type { Result } from "@/utils";

// 国タイプを定義
type Country = {
    id: string;
    name: string;
    japaneseName: string;
    code: string;
    flagUrl: string;
}

// 国一覧を取得する関数
export const getCountriesFromDB = async ({
    prisma
}: {
    prisma: Prisma
}): Promise<Result<Country[], { errorCode: 401 | 403 | 500 }>> => {
    try {
        const countries = await prisma.rCountry.findMany({
            where: { isMajor: true },
            orderBy: { name: 'asc'},
        });
        // 取得した国一覧を返す
        return { success: true, data: countries };
    } catch (error) {
        return { success: false, error: { errorCode: 500 } };
    }
}