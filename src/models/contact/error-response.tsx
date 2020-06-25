import {Error} from "../common/error";

export interface ErrorResponse {
    $id: string;
    Errors: Error[];
    IsSuccess: boolean;
}