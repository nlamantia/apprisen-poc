import { IonBackButton, IonButtons, IonCard, IonContent, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonTitle, IonToolbar, withIonLifeCycle } from "@ionic/react";
import React, { Component } from "react";
import { Lender } from "../../models/lender";

class LenderOverview extends Component {
    state = {
        lender: {} as Lender
    };

    ionViewWillEnter() {
        this.setState({
            lender: (this.props as any).lender.history.location.state.lender
        });
    }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/overview" />
                        </IonButtons>
                        <IonTitle>{this.state.lender.lenderName}</IonTitle>
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
                                    <h3>Next Payment Amount</h3>
                                </IonLabel>
                                <IonLabel>
                                    <h3 className={"ion-text-right"}>
                                        ${this.state.lender.nextPaymentAmount}
                                    </h3>
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>Remaining Balance</h3>
                                </IonLabel>
                                <IonLabel>
                                    <h3 className={"ion-text-right"}>
                                        ${this.state.lender.remainingDebtBalance}
                                    </h3>
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>Starting Balance</h3>
                                </IonLabel>
                                <IonLabel>
                                    <h3 className={"ion-text-right"}>
                                        ${this.state.lender.startingDebtBalance}
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