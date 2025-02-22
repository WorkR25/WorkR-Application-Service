import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import ApplicationRepository from './ApplicationRepository';

async function repositoryPlugin(fastify: FastifyInstance) {
    fastify.decorate('applicationRepository', new ApplicationRepository());
}

export default fastifyPlugin(repositoryPlugin);