import type { Prisma } from "@/lib";

// 国タイプを定義
type Country = {
    id: string;
    name: string;
    japaneseName: string;
    code: string;
    flagUrl: string;
}

// 国一覧を取得する関数
export const getCountriesFromDB = async ({prisma}): Promise<
{
    success: boolean;
    data?: Country[];
    error?: string;
}
> => {
    const countries = await prisma.rCountry.findMany({
        where: { isMajor: true },
        orderBy: { name: 'asc'},
    });
    // 取得した国一覧を返す
    return { success: true, data: countries };
}