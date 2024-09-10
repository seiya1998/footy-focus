import { join } from 'path';
import autoload from '@fastify/autoload';
import { FastifyInstance } from 'fastify';

export default async (fastify: FastifyInstance) => {
    await fastify.register(autoload, {
        dir: join(__dirname, '../routes'),

        // ルート定義にパラメータがある場合はtrueにする
        routeParams: true,

        // ファイル名が_handlers.tsで終わるファイルのみ読み込む
        matchFilter: (path: string) =>
            path.split('/').at(-1)?.split('.').at(-2) === '_handlers'
    });
}