import { UserMetaData } from "../models/userMetaData.model";

export class CommonsUtil {
    static getUserInfo(payload: any): UserMetaData {
        const defaultUser = payload.permissions.includes('default_user');
        const isAdmin = payload.permissions.includes('admin');
        return {
            userId: payload.userId,
            fullName: payload.fullName,
            email: payload.email,
            defaultUser: defaultUser,
            isAdmin: isAdmin
        }
    }
}