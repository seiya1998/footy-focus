import { prisma } from "@/lib";
import type { Prisma } from "@/lib";

// dbMiddleware関数を定義
// callback関数を引数に取り、Prismaクライアントを引数に渡して実行する関数を返す
// dbMiddleware関数を使うことで、Prismaクライアントを引数に渡す必要がなくなる
export const dbMiddleware = 
    <CallbackInput extends { prisma: Prisma }, CallbackResult>(
        callback: (args: CallbackInput) => Promise<CallbackResult>
    ): ((args?: Omit<CallbackInput, "prisma">) => Promise<CallbackResult>) =>
    async (args) => {
        const argsWithPrisma = { ...args, prisma } as CallbackInput;
        return await callback(argsWithPrisma);
    }