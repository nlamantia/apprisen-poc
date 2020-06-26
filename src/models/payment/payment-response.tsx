import {Error} from '../common/error'

export interface PaymentResponse {
    ConfirmationNumber: string;
    IsSuccess: boolean;
    Errors: Error[];
}