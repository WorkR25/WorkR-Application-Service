import jwt, { Secret } from 'jsonwebtoken';

import serverConfig from '../../configs/serverConfig';
import { UserTokenPayload } from '../../types/UserTokenPayload';

const { JWT_SECRET } = serverConfig;

function verifyToken(token: string) {
    try {
        return jwt.verify(token, JWT_SECRET as Secret) as UserTokenPayload;
    } catch (error) {
        throw error;
    }
}

export default {
    verifyToken
};