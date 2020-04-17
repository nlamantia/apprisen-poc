import {Error} from '../common/error'

export interface PaymentResponse {
    confirmationNumber: string;
    IsSuccess: boolean;
    errors: Error[];
}