import { FastifyInstance,FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { ZodSchema } from 'zod';

import logger from '../configs/loggerConfig';
import BaseError from '../errors/BaseError';
import ErrorResponse from '../utils/common/ErrorResponse';

export function validator(
    schema: { body?: ZodSchema<unknown>; params?: ZodSchema<unknown>; query?: ZodSchema<unknown> }
) {
    return async function (this: FastifyInstance, req: FastifyRequest, res: FastifyReply) {
        try {
            schema.body?.parse(req.body);
            schema.params?.parse(req.params);
            schema.query?.parse(req.query);

            const token = req.headers['x-access-token'] as string;
            this.applicationService.isAuthenticated(token);
        } catch (error) {
            if(error instanceof BaseError) {
                throw error;
            }
            logger.error('Invalid Request Structure');
            ErrorResponse.message = 'Invalid Request Structure';
            ErrorResponse.error = error;
            return res.status(StatusCodes.BAD_REQUEST).send(ErrorResponse);
        }
    };
}
