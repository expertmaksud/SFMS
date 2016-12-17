export interface ReqResponse {
    success: boolean;
    result: any;
    error: ReqError;
    unAuthorizedRequest: boolean;
}



export interface ReqError {
    code: number;
    message: string;
    details: string;
    validationErrors: string;
}