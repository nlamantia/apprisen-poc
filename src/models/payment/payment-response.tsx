import {Error} from '../common/error'

export interface PaymentResponse {
    confirmationNumber: string;
    isSuccess: boolean;
    errors: Error[];
}