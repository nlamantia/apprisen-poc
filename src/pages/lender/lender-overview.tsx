import {
    IonBackButton,
    IonButtons,
    IonCard,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonSkeletonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React, {Component} from "react";
import {connect} from 'react-redux'

class _LenderOverview extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { debts, selectedDebtId } = this.props as any

        const lender = debts.filter(debt => debt.$id === selectedDebtId)[0]

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/overview" />
                        </IonButtons>
                        <IonTitle>{lender.creditorName}</IonTitle>
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
                                        {lender.accountNumber}
                                    </h3>
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>Remaining Balance</h3>
                                </IonLabel>
                                <IonLabel>
                                    <h3 className={"ion-text-right"}>
                                        ${lender.currentBalance}
                                    </h3>
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>Starting Balance</h3>
                                </IonLabel>
                                <IonLabel>
                                    {lender.originalBalance ?
                                        <h3 className={"ion-text-right"}>
                                            ${lender.originalBalance.toFixed(2)}
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
                                        {lender.apr}%
                                    </h3>
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>Debt Type</h3>
                                </IonLabel>
                                <IonLabel>
                                    <h3 className={"ion-text-right"}>
                                        {lender.debtType}
                                    </h3>
                                </IonLabel>
                            </IonItem>
                        </IonList>
                    </IonCard>
                </IonContent>
            </IonPage>
        )
    }
}

const LenderOverview = connect(
    state => ({
        // todo implement as selector?
        // todo error checking
        debts: state.debt.debts,
        selectedDebtId: state.debt.selectedDebtId,
    })
)(
    _LenderOverview
);

export default LenderOverview
