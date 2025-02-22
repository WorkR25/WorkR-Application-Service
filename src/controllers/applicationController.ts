import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { QueryFailedError } from 'typeorm';

import { CreateApplicationDto, GetApplicantsDto, GetApplicationDto } from '../dtos/ApplicationDto';
import ErrorResponse from '../utils/common/ErrorResponse';
import SuccessResponse from '../utils/common/SuccessResponse';

async function createApplication(this: FastifyInstance, req: FastifyRequest, res: FastifyReply) {
    const requestBody = req.body as CreateApplicationDto;

    try {
        const response = await this.applicationService.createApplication(requestBody);
        SuccessResponse.data = response;
        return res.status(StatusCodes.CREATED).send(SuccessResponse);
    } catch (error) {
        if(error instanceof QueryFailedError && error.driverError.code == '23505') {
            ErrorResponse.message = 'Already applied for this job, can not apply twice';
            ErrorResponse.data = { applicantId: requestBody.applicantId };

            return res.status(StatusCodes.BAD_REQUEST).send(ErrorResponse);
        }

        throw error;
    }
}

async function getAllApplicants(this: FastifyInstance, req: FastifyRequest, res: FastifyReply) {
    try {
        const queryParams = req.query as GetApplicantsDto;
        const token = req.headers['x-access-token'] as string;
        const response = await this.applicationService.getAllApplicant(Number(queryParams.userId), queryParams.jobId, token);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).send(SuccessResponse);
    } catch (error) {
        throw error;
    }
}

async function getApplicationByApplicantId(this: FastifyInstance, req: FastifyRequest, res: FastifyReply) {
    try {
        const queryParams = req.query as GetApplicationDto;
        const token = req.headers['x-access-token'] as string;
        const response = await this.applicationService.getApplicationByApplicantId(queryParams.applicantId, token);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).send(SuccessResponse);
    } catch (error) {
        throw error;
    }
}

export default {
    createApplication,
    getAllApplicants,
    getApplicationByApplicantId
};