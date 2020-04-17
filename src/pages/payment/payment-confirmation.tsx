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
import React from "react";
import {makePayment} from "../../feature/payment/action";
// eslint-disable-next-line


const _PaymentConfirmation = ( props ) => {
    const { confirmation } = props;

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
                <IonContent id="paymentConfirmation">
                    <IonGrid>
                        <IonRow>
                            <IonCol size={"12"} sizeMd={"8"} offsetMd={"2"}>
                                <IonCard>
                                    <IonList class="ion-no-padding">
                                        <IonListHeader class={"white ion-text-center ion-padding-end"}>
                                            <IonLabel>
                                                <h2>Confirmation Number</h2>
                                            </IonLabel>
                                        </IonListHeader>
                                        <IonItem>
                                            <IonLabel position="stacked">
                                                <h2>{confirmation}</h2>
                                            </IonLabel>
                                        </IonItem>
                                        <IonButton className={'full-button'} onClick={() => props.history.push('/overview')} expand="full">
                                            Back to Overview
                                        </IonButton>
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

const PaymentConfirmation = connect(
    state => ({
        confirmation: state.payment.confirmation
    }),
    dispatch => {}
)(
    _PaymentConfirmation
);

export default PaymentConfirmation
