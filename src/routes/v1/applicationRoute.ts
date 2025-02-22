import { FastifyInstance } from 'fastify';

import applicationController from '../../controllers/applicationController';
import { createApplicationZodSchema, getApplicantsZodSchema, getApplicationZodSchema } from '../../dtos/ApplicationDto';
import { validator } from '../../validators/validateRequest';

async function jobRoute(fastify: FastifyInstance) {
    fastify.post('/apply', {
        preValidation: validator({ body: createApplicationZodSchema })
    }, applicationController.createApplication);

    fastify.get('/', {
        preValidation: validator({ query: getApplicantsZodSchema })
    }, applicationController.getAllApplicants);

    fastify.get('/application-details', {
        preValidation: validator({ query: getApplicationZodSchema })
    }, applicationController.getApplicationByApplicantId);
}

export default jobRoute;