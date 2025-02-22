import ApplicationRepository from '../repositories/ApplicationRepository';
import ApplicationService from '../services/ApplicationService';

declare module 'fastify' {
    interface FastifyInstance {
        // Services
        applicationService: ApplicationService

        // Repsotories
        applicationRepository: ApplicationRepository
    }
}