import { BehaviorSubject } from 'rxjs'
import { ClientInformation } from '../models/case/client-information';
import { CaseSummary } from '../models/case/case-summary';
import { DebtDetail } from '../models/case/debt-detail';
import authService from './auth.service';
import { CaseDebt } from '../models/case/case-debt';
import { restService } from './rest.service';


// todo remove
class DataService {

    // todo
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

    // todo deprecate
    public getCaseSummaryAsObservable() {
        return this.caseSummarySubject.asObservable();
    }

}

export const dataService = new DataService();