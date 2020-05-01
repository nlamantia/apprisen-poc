import {
    IonButton,
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
    IonThumbnail,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {connect} from 'react-redux'
import React from "react";
import logo from "../../images/apprisen-logo.png";
// eslint-disable-next-line

const _PaymentConfirmation = ( props ) => {
    const { confirmation } = props;

    const goToOverview = () => {
        // back to overview page
        props.history.goBack();
        props.history.goBack();
    };

    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonThumbnail class="toolbar-logo" slot={"start"}>
                            <img alt="apprisen-logo" src={logo}/>
                        </IonThumbnail>
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
                                        <IonItem lines={'none'}>
                                            <IonLabel className={'center-aligned'}>
                                                <h2>Payment successful! Your confirmation number is: </h2>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem lines={'none'}>
                                            <IonLabel className={'bold-and-centered'}>
                                                <h2>{confirmation}</h2>
                                            </IonLabel>
                                        </IonItem>
                                        <IonButton onClick={goToOverview} expand="block">
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
        confirmation: state.payment.confirmationNumber
    }),
    () => {}
)(
    _PaymentConfirmation
);

export default PaymentConfirmation
