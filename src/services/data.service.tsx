import { BehaviorSubject } from 'rxjs'
import { ClientInformation } from '../models/case/client-information';
import { CaseSummary } from '../models/case/case-summary';
import { DebtDetail } from '../models/case/debt-detail';
import { authService } from './auth.service';
import { CaseDebt } from '../models/case/case-debt';
import { restService } from './rest.service';


class DataService {

    private clientInformationSubject: BehaviorSubject<ClientInformation>;
    private caseSummarySubject: BehaviorSubject<CaseSummary>;
    private debtDetailSubject: BehaviorSubject<DebtDetail>;
    private selectedLenderSubject: BehaviorSubject<CaseDebt>;

    constructor() {
        console.log('calling data service constructor')
        this.clientInformationSubject = new BehaviorSubject({} as ClientInformation);
        this.caseSummarySubject = new BehaviorSubject({} as CaseSummary);
        this.debtDetailSubject = new BehaviorSubject({} as DebtDetail);
        this.selectedLenderSubject = new BehaviorSubject({} as CaseDebt);
    }

    public selectCaseDebt(caseDebt: CaseDebt) {
        this.selectedLenderSubject.next(caseDebt);
    }

    public getSelectedLenderAsObservable() {
        return this.selectedLenderSubject.asObservable();
    }

    public async refreshCaseSummaryData() {
        const caseId = await authService.getCaseId();
        console.log('retrieved caseId: ' + caseId);
        this.caseSummarySubject.next(await restService.callCaseSummaryEndpoint(caseId));
    }

    public async refreshClientInformationData() {
        const caseId = await authService.getCaseId();
        const clientInfo = await restService.callClientInformationEndpoint(caseId);
        this.clientInformationSubject.next(clientInfo);
    }

    public async refreshDebtDetailData() {
        const caseId = await authService.getCaseId();
        this.debtDetailSubject.next(await restService.callDebtDetailEndpoint(caseId));
    }

    public getCaseSummaryAsObservable() {
        return this.caseSummarySubject.asObservable();
    }

    public getClientInformationAsObservable() {
        return this.clientInformationSubject.asObservable();
    }

    public getDebtDetailAsObservable() {
        return this.debtDetailSubject.asObservable();
    }


} 

export const dataService = new DataService();