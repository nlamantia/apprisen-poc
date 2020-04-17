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
    IonRow, IonSelect, IonSelectOption,
    IonTitle,
    IonToolbar,
    IonInput,
    IonButton
} from "@ionic/react";
import {connect} from 'react-redux'
import React, {useEffect, useState} from "react";
import {bindActionCreators} from "redux";
import {getClientAccountData} from "../../feature/payment/action";
// eslint-disable-next-line


const _MakePayment = ( props ) => {
    const { clientAccountData, getClientAccountData } = props;
    const { credentials } = props;

    const { bankAccountTypes } = clientAccountData;
    const { linkedApplication: [{}, { externalId }] } = credentials;

    const [accountType, setAccountType] = useState<string>('');
    const [prefix, setPrefix] = useState<string>('');
    console.log("External ID: " + externalId);

    let date = new Date();
    date.setMonth(3);
    date.setFullYear(2029);
    date.setDate(27);
    const printDate = (date) => {
        if (date && date.getMonth() && date.getDate() && date.getFullYear()) {
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const year = date.getFullYear();
            return year + "-" + printTwoDigitNumber(month) + "-" + printTwoDigitNumber(day);
        } else {
            return "";
        }
    };

    const printTwoDigitNumber = (num: number) => {
        return num < 10 ? "0" + num : num;
    }

    useEffect(() => {
        if (!clientAccountData || !bankAccountTypes) {
            console.log("No client account data. Fetching...");
            getClientAccountData();
        }
    });

    const [paymentRequest, setPaymentRequest] = useState<PaymentRequest>();

    function handleChange(evt: any) {
        setPaymentRequest({ ...paymentRequest, [evt.target.name]: evt.target.value })
        console.log(paymentRequest)
    }

    return (
        <>
            {/*<Menu pageName={'accountOverview'} /> todo fix this*/}
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
                        <IonRow>
                            <IonCol size={"12"} sizeMd={"6"} offsetMd={"3"}>
                                <IonCard>
                                    <IonList class="ion-no-padding">
                                        <IonListHeader class={"white ion-text-center ion-padding-end"}>
                                            <IonLabel>
                                                <h2>Banking Information</h2>
                                            </IonLabel>
                                        </IonListHeader>
                                        <IonItem>
                                            <IonLabel>
                                                <h3>Account Type</h3>
                                            </IonLabel>
                                            <IonSelect value={accountType} className={"ion-text-right"}  onIonChange={e => setAccountType(e.detail.value)}>
                                                {bankAccountTypes.map((bankAccountType) => {
                                                    return(
                                                        <IonSelectOption value={bankAccountType.id}>{bankAccountType.name}</IonSelectOption>
                                                    );
                                                })}
                                            </IonSelect>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>
                                                <h3>Bank Routing #</h3>
                                            </IonLabel>
                                            <h3 className={"ion-text-right"}>
                                                {'<'}Input{'>'}
                                            </h3>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>
                                                <h3>Bank Account #</h3>
                                            </IonLabel>
                                            <h3 className={"ion-text-right"}>
                                                {'<'}Input{'>'}
                                            </h3>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>
                                                <h3>Primary Name on Account</h3>
                                            </IonLabel>
                                            <IonSelect value={prefix} onIonChange={(e) => setPrefix(e.detail.value)}>
                                                <IonSelectOption value={'Mr.'}>Mr.</IonSelectOption>
                                                <IonSelectOption value={'Mrs.'}>Mr.</IonSelectOption>
                                                <IonSelectOption value={'Ms.'}>Mr.</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                        <IonItem>
                                            <IonButton slot={'start'}>
                                                <b>Cancel</b>
                                            </IonButton>
                                            <IonButton slot={'end'}>
                                                <b>Submit</b>
                                            </IonButton>
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

const MakePayment = connect(
    state => ({
        credentials: state.auth.credentials,
        clientAccountData: state.payment.clientAccountData
    }),
    dispatch => bindActionCreators({
        getClientAccountData
    }, dispatch)
)(
    _MakePayment
);

export default MakePayment
