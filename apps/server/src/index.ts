import fastify from 'fastify';
import fastifyAutoLoad from '@/utils/fastifyAutoLoad';

const PORT = 8080;
const HOST = '0.0.0.0';

const server = fastify();

const init = async ({ host, port }: { host: string, port: number }) => {
    await server.register(fastifyAutoLoad);
    
    server.listen({ host, port }, (err: Error | null, address: string) => {
        if (err != null) {
            console.error(err)
            process.exit(1)
        }
        console.log(`Server listening at ${address}`)
    })
}

init({ host: HOST, port: PORT });