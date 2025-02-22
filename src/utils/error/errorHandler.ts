import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import BaseError from '../../errors/BaseError';
import ErrorResponse from '../common/ErrorResponse';

function errorHandler(err: Error, _req: FastifyRequest, res: FastifyReply) {
    if(err instanceof BaseError) {
        ErrorResponse.message = err.message;
        ErrorResponse.error = err.details;
        return res.status(err.statusCode).send(ErrorResponse);
    }
    
    ErrorResponse.error = err;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ErrorResponse);
}

export default errorHandler;