import {Error} from "../common/error";

export interface ErrorResponse {
    $id: string;
    errors: Error[];
    IsSuccess: boolean;
}