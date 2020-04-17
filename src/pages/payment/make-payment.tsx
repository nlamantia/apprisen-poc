import {
    IonBackButton, IonButton,
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
import {connect} from 'react-redux'
import React, {useEffect} from "react";
import {bindActionCreators} from "redux";
import {getClientAccountData} from "../../feature/payment/action";
// eslint-disable-next-line


const _MakePayment = ( props ) => {
    const { clientAccountData, getClientAccountData } = props;
    const { credentials } = props;

    const { bankAccountTypes } = clientAccountData;
    const { linkedApplication: [{}, { externalId }] } = credentials;
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
                                                <h2>Payment Information</h2>
                                            </IonLabel>
                                        </IonListHeader>
                                        <IonItem>
                                            <IonLabel>
                                                <h3>Case Number</h3>
                                            </IonLabel>
                                            <IonLabel>
                                                <h3 className={"ion-text-right"}>
                                                    {externalId}
                                                </h3>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>
                                                <h3>
                                                    Payment Amount
                                                </h3>
                                            </IonLabel>
                                            <IonLabel>
                                                <h3 className={"ion-text-right"}>
                                                    {'<'}Input{'>'}
                                                </h3>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>
                                                <h3>
                                                    Payment Date
                                                </h3>
                                            </IonLabel>
                                            <IonLabel>
                                                <h3 className={"ion-text-right"}>
                                                    {printDate(date)}
                                                </h3>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>
                                                <h3>
                                                    Payment Comments
                                                </h3>
                                            </IonLabel>
                                            <IonLabel>
                                                <h3 className={"ion-text-right"}>
                                                    {'<'}Input{'>'}
                                                </h3>
                                            </IonLabel>
                                        </IonItem>
                                    </IonList>
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
                                            <h3 className={"ion-text-right"}>
                                                {'<'}Drop-Down{'>'}
                                            </h3>
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
                                            <h3 className={"ion-text-right"}>
                                                {'<'}Drop-Down{'>'}
                                                {'<'}Input{'>'}
                                            </h3>
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
