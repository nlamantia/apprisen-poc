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
    IonToast,
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
    const toastDuration = 3000;

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

    // for input validation
    const [validRoutingNumber, setValidRoutingNumber] = useState<boolean>(false);
    const [validAccountNumber, setValidAccountNumber] = useState<boolean>(false);
    const [validAmount, setValidAmount] = useState<boolean>(false);
    const [validBankAccountType, setValidBankAccountType] = useState<boolean>(false);
    const [validName, setValidName] = useState<boolean>(false);
    const [validClientComments, setValidClientComments] = useState<boolean>(false);
    const [fieldsVisited, setFieldsVisited] = useState<string[]>([]);

    // for showing toast
    const [shouldShowToast, setShouldShowToast] = useState<boolean>(false);

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
        if (isValidInput()) {
            makePayment(payment);
        } else {
            console.error("Unable to make payment - invalid input");
            setShouldShowToast(true);
        }
    };

    const validate = (evt) => {
        const input = evt.target.value;
        let valid = false;
        switch (evt.target.name) {
            case 'amount':
                valid = validatePositiveDecimal(input) && input > 0;
                setValidAmount(valid);
                break;
            case 'clientComments':
                valid = validateText(input);
                setValidClientComments(valid);
                break;
            case 'bankAccountType':
                valid = validateNonEmptyText(input);
                setValidBankAccountType(valid);
            case 'primaryNameOnAccount':
                valid = validateAlphanumericOnly(input);
                setValidName(valid);
                break;
            case 'accountNumber':
                valid = validateNumber(input);
                setValidAccountNumber(valid);
                break;
            case 'routingNumber':
                valid = validateNumber(input);
                setValidRoutingNumber(valid);
                break;
            default:
                console.log('Unrecognized field for validation');
        }
        evt.target.color = valid ? 'dark' : 'danger';
        setFieldsVisited(getUpdatedFieldsVisited(evt.target.name));
    };

    const getUpdatedFieldsVisited = (field: string): string[] => {
        let fields = [];
        for (let i in fieldsVisited) {
            fields.push(fieldsVisited[i]);
        }
        fields.push(field);
        return fields.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
    };

    const visited = (field: string): boolean => {
        return fieldsVisited.includes(field);
    };

    const isValidInput = () => {
        return validAccountNumber
                && validAmount
                && validName
                && validClientComments
                && validRoutingNumber
                && validBankAccountType;
    };

    function handleChange(evt: any) {
        validate(evt);
        setPaymentRequest({ ...payment, [evt.target.name]: evt.target.value });
    }

    const validateNumber = (text) => {
        return /\d+/.test(text);
    };

    const validatePositiveDecimal = (text) => {
        return /([1-9]\d*(\.\d{2})?)$|(0(\.\d{2})?)$/.test(text);
    }

    const validateText = (text) => {
        return /[A-Za-z0-9]*/.test(text);
    };

    const validateAlphanumericOnly = (text) => {
        return /[A-Za-z]+/.test(text);
    };

    const validateNonEmptyText = (text) => {
        return /[A-Za-z0-9]+/.test(text);
    };

    return (
        <>
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
                    <IonToast
                        isOpen={shouldShowToast}
                        onDidDismiss={() => setShouldShowToast(false)}
                        message="You have errors in your information. Please try again."
                        color="danger"
                        duration={toastDuration}
                    />
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
                                        <IonItem lines={'none'}>
                                            <IonLabel color={!visited("amount") || validAmount ? 'dark' : 'danger'} position="stacked">Amount</IonLabel>
                                            <IonInput name="amount" placeholder="Payment Amount" onIonChange={(e) => handleChange(e)} onIonBlur={validate}></IonInput>
                                        </IonItem>
                                        <IonItem lines={'none'}>
                                            <IonLabel position="stacked">Payment Date</IonLabel>
                                            <IonInput name="effectiveDate" placeholder="Payment Date"  readonly={true} value={printDate(date)}></IonInput>
                                        </IonItem>
                                        <IonItem lines={'none'}>
                                            <IonLabel color={!visited("clientComments") || validClientComments ? 'dark' : 'danger'} position="stacked">Comment</IonLabel>
                                            <IonInput name="clientComments" placeholder="Comment" onIonChange={(e) => handleChange(e)} onIonBlur={validate}></IonInput>
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
                                        <IonItem lines={'none'}>
                                            <IonLabel color={!visited("bankAccountType") || validBankAccountType ? 'dark' : 'danger'} position="floating">Account Type</IonLabel>
                                            <IonSelect name="bankAccountType" placeholder="Select One" onIonChange={(e) => handleChange(e)}>
                                                {bankAccountTypes.map((bankAccountType) => {
                                                    return(
                                                        <IonSelectOption value={bankAccountType.id}>{bankAccountType.name}</IonSelectOption>
                                                    );
                                                })}
                                            </IonSelect>
                                        </IonItem>
                                        <IonItem lines={'none'}>
                                            <IonLabel color={!visited("routingNumber") || validRoutingNumber ? 'dark' : 'danger'} position="floating">Routing Number</IonLabel>
                                            <IonInput name="routingNumber" ref={routingNumber} placeholder="Routing Number" onIonBlur={validate} onIonChange={(e) => handleChange(e)}></IonInput>
                                        </IonItem>
                                        <IonItem lines={'none'}>
                                            <IonLabel color={!visited("accountNumber") || validAccountNumber ? 'dark' : 'danger'} position="floating">Account Number</IonLabel>
                                            <IonInput name="accountNumber" ref={accountNumber} placeholder="Account Number" onIonBlur={validate} onIonChange={(e) => handleChange(e)}></IonInput>
                                        </IonItem>
                                        <IonItem lines={'none'}>
                                            <IonLabel color={!visited("primaryNameOnAccount") || validName ? 'dark' : 'danger'} position="floating">Primary Name on Account</IonLabel>
                                            <IonInput name="primaryNameOnAccount" placeholder="Name" onIonBlur={validate} onIonChange={(e) => handleChange(e)}></IonInput>
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
