import cors from '@fastify/cors';
import Fastify from 'fastify';

import app from './app';
import db from './configs/dbConfig';
import logger from './configs/loggerConfig';
import serverConfig from './configs/serverConfig';
import errorHandler from './utils/error/errorHandler';

const { PORT } = serverConfig;

const fastify = Fastify();

fastify.register(cors, {
    origin: ['https://www.workr.club'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
});

fastify.register(app);

fastify.setErrorHandler(errorHandler);

fastify.listen({ port: PORT, host: '0.0.0.0' }, async (err) => {
    if(err) {
        fastify.log.error(err);
        process.exit(1);
    }
    await db.connect();
    logger.info(`Server started at PORT: ${PORT}`);
});