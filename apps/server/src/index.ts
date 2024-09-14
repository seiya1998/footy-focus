import * as fs from 'fs';
import helmet from '@fastify/helmet';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyAutoLoad from '@/utils/fastifyAutoLoad';
import fastify from 'fastify';

const PORT = 8080;
const HOST = '0.0.0.0';

const server = fastify();

const init = async ({ host, port }: { host: string, port: number }) => {
    await server.register(fastifySwagger, {
        openapi: {
            openapi: '3.0.0',
            info: {
                title: 'Fastify API',
                description: 'testing fastify swagger',
                version: '0.0.0'
            },
        }
    });
    await server.register(fastifySwaggerUi, {
        routePrefix: '/docs'
    });
    await server.register(fastifyAutoLoad);

    await server.register(helmet, {
        global: true,
        noSniff: true // X-Content-Type-Options: nosniff を有効にする
    });

    await server.ready();
    server.swagger();

    const responseYaml = await server.inject('/docs/yaml');
    if (responseYaml.statusCode !== 200) {
        console.error(JSON.parse(responseYaml.payload).message);
        process.exit(1);
    }

    // 開発環境のみ、openapi.yamlを出力
    (process.env['NODE_ENV'] ?? '') === 'development' &&
        fs.writeFileSync('docs/openapi.yaml', responseYaml.payload);
    
    server.listen({ host, port }, (err: Error | null, address: string) => {
        if (err != null) {
            console.error(err)
            process.exit(1)
        }
        console.log(`Server listening at ${address}`)
    })
}

init({ host: HOST, port: PORT });