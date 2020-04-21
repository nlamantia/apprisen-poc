export interface PaymentStatus {
    paymentStatus: "SUCCESS" | "FAILURE" | "PENDING";
    active: boolean;
}