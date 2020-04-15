import {
    IonBackButton,
    IonButtons,
    IonCard,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenuButton,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React from "react";
// eslint-disable-next-line
import Menu from "../menu/menu";


const MakePayment = ( props ) => {
    // const { caseSummary, debts } = props
    // const { estimatedBalance, currentMonthlyPayment, totalMonthlyDeposit } = caseSummary

    return (
        <>
            {/*<Menu pageName={'accountOverview'} /> todo fix this*/}
            <Menu />
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/overview" />
                        </IonButtons>
                        <IonTitle>Make a Payment</IonTitle>
                        <IonButtons slot="end">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent id="makePayment">
                    <IonGrid>
                        <IonRow>
                            <IonCol size={"12"} sizeMd={"6"} offsetMd={"3"}>
                                <IonCard>
                                    <IonList class="ion-no-padding">
                                        <IonListHeader class={"white ion-text-center ion-padding-end"}>
                                            <IonLabel>
                                                <h2>Payment Information</h2>
                                            </IonLabel>
                                        </IonListHeader>
                                        <IonItem>
                                            <IonLabel>
                                                <h3>Current Balance</h3>
                                            </IonLabel>
                                            <IonLabel>
                                                <h3 className={"ion-text-right"}>
                                                    $15000
                                                </h3>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>
                                                <h3>
                                                    Monthly Payment
                                                </h3>
                                            </IonLabel>
                                            <IonLabel>
                                                <h3 className={"ion-text-right"}>
                                                    $400
                                                </h3>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>
                                                <h3>
                                                    Total Monthly Deposit
                                                </h3>
                                            </IonLabel>
                                            <IonLabel>
                                                <h3 className={"ion-text-right"}>
                                                    $400
                                                </h3>
                                            </IonLabel>
                                        </IonItem>
                                    </IonList>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </>
    )
};

// const AccountOverview = connect(
//     state => ({
//         caseSummary: state.case.caseSummary,
//         debts: state.debt.debts
//     }),
//     dispatch => bindActionCreators({
//         getCaseSummary,
//         getDebts
//     }, dispatch)
// )(
//     _AccountOverview
// );

export default MakePayment
