import NotFoundError from '../errors/NotFoundError';
import Application from '../models/Application';
import CrudRepository from './CrudRepository';

class ApplicationRepository extends CrudRepository {
    constructor() {
        super(Application);
    }

    async getAllApplicationByJobId(jobId: string) {
        const applications = await Application.findBy({ jobId });
        return applications;
    }

    async getApplicationByApplicantId(applicantId: number) {
        const application = await Application.findOneBy({ applicantId });
        if(!application) {
            throw new NotFoundError('applicantId', String(applicantId));
        }
        return application;
    }
}

export default ApplicationRepository;