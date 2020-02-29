import React, { Component } from "react";
// eslint-disable-next-line
import { IonItem, IonLabel, IonList, IonThumbnail, withIonLifeCycle, IonListHeader, IonCard, IonButton } from "@ionic/react";
// eslint-disable-next-line
import bank from "../../images/bank.svg";
import { DebtDetail } from "../../models/case/debt-detail";
import { dataService } from "../../services/data.service"
import { CaseDebt } from "../../models/case/case-debt";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators"
import { Link } from "react-router-dom";

class LenderList extends Component {

    unsubscribeSubject = new Subject<void>();

    state = {
        debtDetail: {} as DebtDetail
    }

    componentDidMount() {
        dataService.getDebtDetailAsObservable()
            .pipe(takeUntil(this.unsubscribeSubject))
            .subscribe(data => {
                console.log('updated state: ' + data)
                this.setState({
                    debtDetail: data
                });
            })
    }

    ionViewWillLeave() {
        this.unsubscribeSubject.next();
    }

    render() {
        return (
            <IonCard class="color">
                <IonList class="ion-no-padding">
                    <IonListHeader class={"white"}>
                        <IonLabel>
                            <h2>Lenders</h2>
                        </IonLabel>
                    </IonListHeader>

                    {this.state.debtDetail.caseDebts != null && this.state.debtDetail.caseDebts.map((caseDebt: CaseDebt, i: any) => {
                        return (
                            <IonItem key={i}>
                                <IonLabel>
                                    <h3>{caseDebt.creditorName}</h3>
                                    <p>${caseDebt.currentBalance} balance</p>
                                </IonLabel>
                                <Link
                                    to={{
                                        pathname: `/lender-overview`,
                                        state: { lender: caseDebt }
                                    }}
                                >
                                    <IonButton onClick={() => dataService.selectCaseDebt(caseDebt)} fill={'clear'} className={'lender-button'}>Info</IonButton>
                                </Link>
                            </IonItem>
                        )
                    })}
                </IonList>
            </IonCard>
        )
    }


}

export default withIonLifeCycle(LenderList)
