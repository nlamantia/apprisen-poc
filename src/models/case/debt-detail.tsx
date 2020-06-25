import { CaseDebt } from "./case-debt";

export interface DebtDetail {
    CaseDebts: CaseDebt[];
    Errors: any[];
    IsSuccess: boolean;
    $id: string;
}