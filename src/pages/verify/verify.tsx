import {
    IonButton,
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
    IonPage,
    IonRow,
    IonThumbnail,
    IonTitle,
    IonToolbar,
    IonToast
} from "@ionic/react";
import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {verify} from "../../feature/auth/action";
import {useAuthContext} from "../../common/AuthProvider";
import {useLocation} from "react-router";
import {
    validateAlphanumericOnly,
    validateNonEmptyText, validateNumber,
    validatePositiveDecimal,
    validateText,
    validateNonEmptyString
} from "../common/validators";

const _Verify = (props: any) => {
    const [lastFourOfSSID, setLastFourOfSSID] = useState(null)
    const [zipCode, setZipCode] = useState(null)
    const [clientId, setClientId] = useState(null)

    const SSNLength = 4;
    const zipCodeLength = 5;

    const { verify } = props

    const { pathname } = useLocation()

    const {isVerifiedOptional, isAuthedOptional }  = useAuthContext()
    useEffect(() => {
        if (isVerifiedOptional.isPresent && isVerifiedOptional.value && pathname !== '/overview') { props.history.push('/overview'); }
    }, [isVerifiedOptional, isAuthedOptional])

    const handleIonChange = (setter) => (e) => {
        setter((e.target as HTMLInputElement).value)
    }

    const [shouldShowErrorToast, setShouldShowErrorToast] = useState<boolean>(false);
    const toastDuration = 3000;

    const handleVerifyClick = () => {
        if(validateVerifyClick(lastFourOfSSID, zipCode, clientId)) {
            verify({lastFourOfSSID, zipCode, clientId})
        }
        else {
            let iris = document.getElementById("sharpenChat");
            iris.style.display = "none";
            setShouldShowErrorToast(true);
        }
    }

    function validateVerifyClick(SSN : number, zipCode : number, clientId : number) {
        return validateSSN(SSN) && validateZipCode(zipCode) && validateClientId(clientId);
    }

    function validateSSN(SSN : number) {
        return validateNumber(SSN) && SSN.toString.length == SSNLength;
    }

    function validateZipCode(zipCode : number) {
        return validateNumber(zipCode) && zipCode.toString.length == zipCodeLength;
    }

    function validateClientId(clientId : number) {
        return validateNumber(clientId);
    }

    const handleToastDismiss = () => {
        let iris = document.getElementById("sharpenChat");
        iris.style.display = "block";
        setShouldShowErrorToast(false);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonThumbnail class="toolbar-logo" slot={"start"}>
                        <img alt="apprisen-logo" src={"/apprisen-logo.png"} />
                    </IonThumbnail>
                    <IonTitle>Apprisen</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonToast
                                isOpen={shouldShowErrorToast}
                                onDidDismiss={handleToastDismiss}
                                message="Error in information. Please try again."
                                color="danger"
                                duration={toastDuration}
                            />
                <IonGrid>
                    <IonRow>
                        <IonCol size={"12"} sizeMd={"6"} sizeLg={"4"} offsetLg={"4"}>
                            <IonCard class="color">
                                <IonList class="ion-no-padding">
                                    <IonListHeader class={"white"}>
                                        <IonLabel>
                                            <h2>Verify Form</h2>
                                        </IonLabel>
                                    </IonListHeader>
                                    <IonItem>
                                        <IonLabel position="floating">Last Four of SSID</IonLabel>
                                        <IonInput name="ssid" placeholder="Enter the last four of your SSID" onIonChange={handleIonChange(setLastFourOfSSID)} type="password"></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">Zip Code</IonLabel>
                                        <IonInput name="zip" placeholder="Enter your zip code"  onIonChange={handleIonChange(setZipCode)} ></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">Client ID</IonLabel>
                                        <IonInput name="clientId" placeholder="Enter your client id" onIonChange={handleIonChange(setClientId)}></IonInput>
                                    </IonItem>
                                    <IonItem className={'full-button'}>
                                        <IonButton className={'full-button'} onClick={handleVerifyClick} expand="full">
                                            Verify
                                        </IonButton>
                                    </IonItem>
                                </IonList>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    )
}


const Verify = connect(
    state => ({}),
    dispatch => bindActionCreators({
        verify
    }, dispatch)
)(
    _Verify
);

export default Verify
