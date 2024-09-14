import helmet from '@fastify/helmet';
import fastifyAutoLoad from '@/utils/fastifyAutoLoad';
import fastify from 'fastify';

const PORT = 8080;
const HOST = '0.0.0.0';

const server = fastify();

const init = async ({ host, port }: { host: string, port: number }) => {
    await server.register(fastifyAutoLoad);

    await server.register(helmet, {
        global: true,
        noSniff: true // X-Content-Type-Options: nosniff を有効にする
    });
    
    server.listen({ host, port }, (err: Error | null, address: string) => {
        if (err != null) {
            console.error(err)
            process.exit(1)
        }
        console.log(`Server listening at ${address}`)
    })
}

init({ host: HOST, port: PORT });