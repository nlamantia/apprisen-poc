import { LinkedApplication } from "./linked-application";

export interface LoginResponse {
    Email: string;
    Errors: any[];
    ExpiresOn: bigint;
    FirstName: string;
    IsSuccess: boolean;
    LastName: string;
    LinkedApplication: LinkedApplication[];
    SignedToken: string;
    StatusCode: number;
    UserId: string;
    Username: string;
    $id: string;
}