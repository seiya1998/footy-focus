import * as fs from "fs";
import { parse } from 'csv-parse/sync';

export const getDataFromCsv = (fileName: string) => {
    const data = fs.readFileSync(`prisma/seed/csv/${fileName}.csv`);
    const records = parse(data, {
        // ヘッダー行を無視する
        from: 2,
    });
    return records;
}