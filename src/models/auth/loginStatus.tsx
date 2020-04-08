// todo refactor this to make more sense
export interface LoginStatus {
    loginState: "ACTIVE" | "INACTIVE" ;
    message: "SUCCESS" | "FAILURE" | "PENDING";
}
