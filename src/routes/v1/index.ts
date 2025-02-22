import { FastifyInstance } from 'fastify';

import jobRoute from './applicationRoute';

async function v1Route(fastify: FastifyInstance) {
    fastify.register(jobRoute, { prefix: '/applications' });
}

export default v1Route;