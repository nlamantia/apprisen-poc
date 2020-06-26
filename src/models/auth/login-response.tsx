import { LinkedApplication } from "./linked-application";

export interface LoginResponse {
    email: string;
    errors: any[];
    expiresOn: string;
    firstName: string;
    isSuccess: boolean;
    lastName: string;
    linkedApplication: LinkedApplication[];
    signedToken: string;
    statusCode: number;
    userId: string;
    username: string;
    $id: string;
}