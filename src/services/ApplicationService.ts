import axios, { AxiosResponse } from 'axios';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import { CreateApplicationDto } from '../dtos/ApplicationDto';
import BadRequestError from '../errors/BadRequestError';
import BaseError from '../errors/BaseError';
import InternalServerError from '../errors/InternalServerError';
// import NotFoundError from '../errors/NotFoundError';
import ApplicationRepository from '../repositories/ApplicationRepository';
import { ApplicationDetails } from '../types/ApplicationDetails';
import { User } from '../types/User';
import auth from '../utils/common/auth';
import { USER_TYPE } from '../utils/enums/UserType';

class ApplicationService {
    private applicationRepository;

    constructor(applicationRepository: ApplicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    async createApplication(data: CreateApplicationDto) {
        try {
            const allApplications = await this.applicationRepository.getAllApplicationByJobId(data.jobId);
            const applicantIds = allApplications.map((application) => application.applicantId);
            if(applicantIds.includes(data.applicantId)) {
                throw new BadRequestError('You have already applied for this job, can not apply twice', { status: 'applied' });
            }
            
            const application = await this.applicationRepository.create(data);
            return application;
        } catch (error) {
            if(error instanceof BaseError) throw error;
            throw new InternalServerError('Can not create the application', error);
        }
    }

    async getApplicationByApplicantId(applicantId: number, token: string) {
        try {
            const user: AxiosResponse<User> = await axios.get(`http://localhost:4000/api/v1/users/${applicantId}`, {
                headers: {
                    'x-access-token': token
                }
            });

            if(!user) {
                throw new BadRequestError('user not found', { user });
            }

            const userType = user.data.data.userType;
            if(userType != USER_TYPE.JOBSEEKER) {
                throw new BadRequestError('User is not an jobseeker, can not show application details', { expected: USER_TYPE.EMPLOYER, provided: userType });
            }

            const application = await this.applicationRepository.getApplicationByApplicantId(applicantId);
            return application;
        } catch (error) {
            if(error instanceof BaseError) throw error;
            throw new InternalServerError('Can not get the application', error);
        }
    }

    async getAllApplicant(userId: number, jobId: string, token: string) {
        try {
            const user: AxiosResponse<User> = await axios.get(`http://localhost:4000/api/v1/users/${userId}`, {
                headers: {
                    'x-access-token': token
                }
            });

            if(!user) {
                throw new BadRequestError('user not found', { user });
            }

            const userType = user.data.data.userType;
            if(userType != USER_TYPE.EMPLOYER) {
                throw new BadRequestError('User is not an employer, can not show applicants', { expected: USER_TYPE.EMPLOYER, provided: userType });
            }

            const applications = await this.applicationRepository.getAllApplicationByJobId(jobId);

            if(applications.length == 0) {
                return [];
            }

            const applicantIds = applications.map((application) => application.applicantId);

            const applicants: AxiosResponse<ApplicationDetails> = await axios.post('http://localhost:4000/api/v1/users/applicants', { applicantIds }, {
                headers: {
                    'x-access-token': token
                }
            });

            return applicants.data.data;
        } catch (error) {
            if(error instanceof BaseError) throw error;
            throw new InternalServerError('Can not fetch applicatnts', error);
        }
    }

    isAuthenticated(token: string) {
        try {
            if(!token) {
                throw new BadRequestError('Missing JWT token', { token: undefined });
            }

            auth.verifyToken(token);
            return true;
        } catch (error) {
            if(error instanceof BaseError) throw error;

            if(error instanceof TokenExpiredError) {
                throw new BadRequestError('JWT token expired, Please login again', { token });
            }

            if(error instanceof JsonWebTokenError) {
                throw new BadRequestError('Invalid JWT token', { token });
            }

            throw new InternalServerError('Something went wrong', {});
        }
    }
}

export default ApplicationService;