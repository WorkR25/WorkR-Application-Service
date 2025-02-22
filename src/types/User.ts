import { USER_ROLE } from '../utils/enums/UserRole';
import { USER_TYPE } from '../utils/enums/UserType';

export interface User {
    data: {
        id: number,
        email: string,
        userType: USER_TYPE
        role: USER_ROLE
    }
}