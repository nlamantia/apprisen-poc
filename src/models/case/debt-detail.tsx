import { CaseDebt } from "./case-debt";

export interface DebtDetail {
    caseDebts: CaseDebt[];
    errors: any[];
    isSuccess: boolean;
    $id: string;
}