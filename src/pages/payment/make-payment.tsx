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
    IonToolbar,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton
} from "@ionic/react";
import React, { useState } from "react";
// eslint-disable-next-line
import Menu from "../menu/menu";


const MakePayment = ( props ) => {
    // const { caseSummary, debts } = props
    // const { estimatedBalance, currentMonthlyPayment, totalMonthlyDeposit } = caseSummary

    const [paymentRequest, setPaymentRequest] = useState<PaymentRequest>();

    function handleChange(evt: any) {
        setPaymentRequest({ ...paymentRequest, [evt.target.name]: evt.target.value })
        console.log(paymentRequest)
    }

    const printDate = (date) => {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        return month + "/" + day + "/" + year;
    };

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
                                                <h2>Payment Details</h2>
                                            </IonLabel>
                                        </IonListHeader>
                                        <IonItem>
                                            <IonLabel position="stacked">Amount</IonLabel>
                                            <IonInput name="amount" placeholder="Payment Amount" onIonChange={(e) => handleChange(e)}></IonInput>
                                            <IonLabel position="floating">Payment Date</IonLabel>
                                            <IonInput name="effectiveDate" placeholder="Payment Date"  readonly={true} value={printDate(new Date())}></IonInput>
                                            <IonLabel position="floating">Comment</IonLabel>
                                            <IonInput name="clientComments" placeholder="Comment" onIonChange={(e) => handleChange(e)}></IonInput>
                                        </IonItem>
                                    </IonList>
                                </IonCard>
                                <IonCard>
                                    <IonList class="ion-no-padding">
                                        <IonListHeader class={"white ion-text-center ion-padding-end"}>
                                            <IonLabel>
                                                <h2>Banking Information</h2>
                                            </IonLabel>
                                        </IonListHeader>
                                        <IonItem>
                                            <IonLabel position="floating">Account Type</IonLabel>
                                            <IonSelect name="bank-account" placeholder="Select One" onIonChange={(e) => handleChange(e)}>
                                                <IonSelectOption value="Chekcing">Checking</IonSelectOption>
                                                <IonSelectOption value="Savings">Savings</IonSelectOption>
                                            </IonSelect>
                                            <IonLabel position="floating">Routing Number</IonLabel>
                                            <IonInput name="routingNumber" placeholder="Routing Number"  onIonChange={(e) => handleChange(e)}></IonInput>
                                            <IonLabel position="floating">Account Number</IonLabel>
                                            <IonInput name="accountNumber" placeholder="Account Number"  onIonChange={(e) => handleChange(e)}></IonInput>
                                            <IonLabel position="floating">Primary Name on Account</IonLabel>
                                            <IonInput name="primaryNameOnAccount" placeholder="Name" onIonChange={(e) => handleChange(e)}></IonInput>
                                        </IonItem>
                                    </IonList>
                                    <IonItem>
                                        <IonButton className={'full-button'} expand="full">
                                                Submit Payment
                                            </IonButton>
                                    </IonItem>
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
