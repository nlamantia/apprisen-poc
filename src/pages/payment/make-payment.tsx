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
import {getCredentials, logout} from "../../feature/auth/action";
import {Redirect} from "react-router";
import {BankAccountType} from "../../models/banking/bank-account-type";
import SocialMediaFooter from "../common/social-media-footer";
// eslint-disable-next-line


const _MakePayment = ( props: any ) => {
    const { clientAccountData, getClientAccountData } = props;
    const { credentials } = props;
    const { paymentStatus, makePayment } = props;
    const { getCredentials, logout } = props;

    const { paymentStatus: status, active } = paymentStatus;
    let externalId = React.useRef(0);

    const routingNumber: any = React.useRef();
    const accountNumber: any = React.useRef();
    const millisInADay = 86400000;
    const numOfDays = 1;

    let date = new Date();
    date.setTime(date.getTime() + (numOfDays * millisInADay));

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

    let initialPaymentRequest = {
        clientNumber: externalId.current,
        caseNumber: externalId.current,
        effectiveDate: printDate(date),
        routingNumber: "",
        accountNumber: "",
        amount: 0,
        bankAccountType: "",
        primaryNameOnAccount: "",
        clientComments: "",
    } as PaymentRequest;

    const [payment, setPaymentRequest] = useState<PaymentRequest>(initialPaymentRequest);
    const [bankAccountTypes, setBankAccountTypes] = useState<BankAccountType[]>([]);

    function redirectLogin() {
        logout();
        return (
            <Redirect to="/login"/>
        );
    }

    useEffect(() => {
        if (credentials && credentials.linkedApplication) {
            const [, linkedApp] = credentials.linkedApplication;
            const { externalId: id } = linkedApp;
            externalId.current = id;
            initialPaymentRequest.clientNumber = externalId.current;
            initialPaymentRequest.caseNumber = externalId.current;
            if (paymentStatus && !active) {
                if (status === "SUCCESS") {
                    routingNumber.current.value = '';
                    accountNumber.current.value = '';
                    setPaymentStatus({paymentStatus: status, active: true})
                    props.history.push('/payment-confirmation');
                }
            }
            console.log("past payment status if statement");
            if (!clientAccountData || !clientAccountData.bankAccountTypes) {
                console.log("No client account data. Fetching...");
                getClientAccountData();
            } else {
                console.log("setting account types");
                setBankAccountTypes(clientAccountData.bankAccountTypes);
            }
        } else {
            try {
                getCredentials();
            } catch (e) {
                redirectLogin();
            }
        }
    }, [paymentStatus, active, credentials, clientAccountData]);

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
                <SocialMediaFooter/>
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
        setPaymentStatus,
        getCredentials,
        logout
    }, dispatch)
)(
    _MakePayment
);

export default MakePayment
