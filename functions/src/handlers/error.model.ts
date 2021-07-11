export enum ErrorType {
    GENERIC_ERROR = 'Generic',
    USER_NOT_FOUND = 'User_Not_Found',
    USERNAME_ALREADY_EXISTS = 'Username_already_exists',
    WRONG_PASSWORD = 'Wrong_Password',
    NO_DATA_FOUND = 'No_data_found'
}

export class Error {
    type: ErrorType = ErrorType.GENERIC_ERROR;
    message: string = 'Oops! Something went wrong on service side. Check the details or try again.';
    httpStatus: number = 500;
    detail?: any;
    [s: string]: any;
}
