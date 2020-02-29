import { IonBackButton, IonButtons, IonCard, IonContent, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonTitle, IonToolbar, withIonLifeCycle, IonSkeletonText } from "@ionic/react";
import React, { Component } from "react";
import { dataService } from "../../services/data.service"
import { CaseDebt } from "../../models/case/case-debt";

class LenderOverview extends Component {
    state = {
        lender: {} as CaseDebt
    };

    ionViewWillEnter() {
        dataService.getSelectedLenderAsObservable().subscribe(lender => {
            this.setState({
                lender: lender
            });
        })
    }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/overview" />
                        </IonButtons>
                        <IonTitle>{this.state.lender.creditorName}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonCard>
                        <IonList class="ion-no-padding">
                            <IonListHeader class={"white ion-text-center ion-padding-end"}>
                                <IonLabel>
                                    <h2>Lender Details</h2>
                                </IonLabel>
                            </IonListHeader>
                            <IonItem>
                                <IonLabel>
                                    <h3>Account Number</h3>
                                </IonLabel>
                                <IonLabel>
                                    <h3 className={"ion-text-right"}>
                                        {this.state.lender.accountNumber}
                                    </h3>
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>Remaining Balance</h3>
                                </IonLabel>
                                <IonLabel>
                                    <h3 className={"ion-text-right"}>
                                        ${this.state.lender.currentBalance}
                                    </h3>
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>Starting Balance</h3>
                                </IonLabel>
                                <IonLabel>
                                    {this.state.lender.originalBalance ?
                                        <h3 className={"ion-text-right"}>
                                            ${this.state.lender.originalBalance.toFixed(2)}
                                        </h3> :
                                        <h3 className={"ion-text-right"}>
                                            <IonSkeletonText animated style={{ width: '100%' }} />
                                        </h3>
                                    }
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>APR</h3>
                                </IonLabel>
                                <IonLabel>
                                    <h3 className={"ion-text-right"}>
                                        {this.state.lender.apr}%
                                    </h3>
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>Debt Type</h3>
                                </IonLabel>
                                <IonLabel>
                                    <h3 className={"ion-text-right"}>
                                        {this.state.lender.debtType}
                                    </h3>
                                </IonLabel>
                            </IonItem>
                        </IonList>
                    </IonCard>
                </IonContent>
            </IonPage>
        )
    }
} export default withIonLifeCycle(LenderOverview);