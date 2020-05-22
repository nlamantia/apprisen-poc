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
    IonToolbar
} from "@ionic/react";
import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import logo from "../../images/apprisen-logo.png";
import {verify} from "../../feature/auth/action";
import {useAuthContext} from "../../common/AuthProvider";
import {useLocation} from "react-router";

const _Login = (props: any) => {
    const [lastFourOfSSID, setLastFourOfSSID] = useState(null)
    const [zipCode, setZipCode] = useState(null)
    const [clientId, setClientId] = useState(null)

    const { verify } = props

    const { pathname } = useLocation()

    const {isVerifiedOptional, isAuthedOptional }  = useAuthContext()
    useEffect(() => {
        console.log({yo: 'yo', isVerifiedOptional, isAuthedOptional})

        if (isVerifiedOptional.isPresent && isVerifiedOptional.value && pathname !== '/overview') { props.history.push('/overview'); }
    }, [isVerifiedOptional, isAuthedOptional])

    const handleIonChange = (setter) => (e) => {
        setter((e.target as HTMLInputElement).value)
    }

    const handleVerifyClick = () => {
        verify({lastFourOfSSID, zipCode, clientId})
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonThumbnail class="toolbar-logo" slot={"start"}>
                        <img alt="apprisen-logo" src={logo} />
                    </IonThumbnail>
                    <IonTitle>Apprisen</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
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
                                        <IonInput name="ssid" placeholder="Enter the last four of your SSID" onIonChange={handleIonChange(setLastFourOfSSID)}></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel position="floating">Zip Code</IonLabel>
                                        <IonInput name="zip" placeholder="Enter your zip code"  onIonChange={handleIonChange(setZipCode)} type="password"></IonInput>
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
    _Login
);

export default Verify
