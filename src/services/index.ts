import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import ApplicationService from './ApplicationService';

async function servicePlugin(fastify: FastifyInstance) {
    fastify.decorate('applicationService', new ApplicationService(fastify.applicationRepository));
}

export default fastifyPlugin(servicePlugin);