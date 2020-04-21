import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenuButton,
    IonPage,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {connect} from 'react-redux'
import React, {useEffect, useState} from "react";
import {bindActionCreators} from "redux";
import {getClientAccountData, makePayment, setPaymentStatus} from "../../feature/payment/action";
import {PaymentRequest} from "../../models/payment/payment-request";
// eslint-disable-next-line


const _MakePayment = ( props: any ) => {
    const { clientAccountData, getClientAccountData } = props;
    const { credentials } = props;
    const { paymentStatus, makePayment } = props;

    const { bankAccountTypes } = clientAccountData;
    const { linkedApplication: [{}, { externalId }] } = credentials;
    const { paymentStatus: status, active } = paymentStatus;

    const routingNumber: any = React.useRef();
    const accountNumber: any = React.useRef();
    const millisInADay = 86400000;

    console.log("External ID: " + externalId);

    let date = new Date();
    date.setTime(date.getTime() + millisInADay);

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
    };

    const initialPaymentRequest = {
        clientNumber: externalId,
        caseNumber: externalId,
        effectiveDate: printDate(date),
        routingNumber: "",
        accountNumber: "",
        amount: 0,
        bankAccountType: "",
        primaryNameOnAccount: "",
        clientComments: "",
    } as PaymentRequest;

    const [payment, setPaymentRequest] = useState<PaymentRequest>(initialPaymentRequest);

    useEffect(() => {
        if (paymentStatus && !active) {
            if (status === "SUCCESS") {
                routingNumber.current.value = '';
                accountNumber.current.value = '';
                setPaymentStatus({paymentStatus: status, active: true})
                props.history.push('/payment-confirmation');
            }
        } else if (!clientAccountData || !bankAccountTypes) {
            console.log("No client account data. Fetching...");
            getClientAccountData();
        }
    }, [paymentStatus, active]);

    const handlePayment = () => {
        console.log("Making payment...");
        console.log(JSON.stringify(payment));
        makePayment(payment);
    };

    function handleChange(evt: any) {
        setPaymentRequest({ ...payment, [evt.target.name]: evt.target.value });
    }

    return (
        <>
            {console.log(payment)}
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
                                            <IonInput name="effectiveDate" placeholder="Payment Date"  readonly={true} value={printDate(date)}></IonInput>
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
                                            <IonSelect name="bankAccountType" placeholder="Select One" onIonChange={(e) => handleChange(e)}>
                                                {bankAccountTypes.map((bankAccountType) => {
                                                    return(
                                                        <IonSelectOption value={bankAccountType.id}>{bankAccountType.name}</IonSelectOption>
                                                    );
                                                })}
                                            </IonSelect>
                                            <IonLabel position="floating">Routing Number</IonLabel>
                                            <IonInput name="routingNumber" ref={routingNumber} placeholder="Routing Number"  onIonChange={(e) => handleChange(e)}></IonInput>
                                            <IonLabel position="floating">Account Number</IonLabel>
                                            <IonInput name="accountNumber" ref={accountNumber} placeholder="Account Number"  onIonChange={(e) => handleChange(e)}></IonInput>
                                            <IonLabel position="floating">Primary Name on Account</IonLabel>
                                            <IonInput name="primaryNameOnAccount" placeholder="Name" onIonChange={(e) => handleChange(e)}></IonInput>
                                        </IonItem>
                                    </IonList>
                                    <IonItem>
                                        <IonButton className={'full-button'} onClick={handlePayment} expand="full">
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

const MakePayment = connect(
    state => ({
        credentials: state.auth.credentials,
        clientAccountData: state.payment.clientAccountData,
        paymentStatus: state.payment.paymentStatus
    }),
    dispatch => bindActionCreators({
        getClientAccountData,
        makePayment,
        setPaymentStatus
    }, dispatch)
)(
    _MakePayment
);

export default MakePayment
