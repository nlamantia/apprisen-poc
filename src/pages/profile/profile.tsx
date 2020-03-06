import React, { useState, useEffect } from 'react';
import { restService } from '../../services/rest.service';
import authService from "../../services/auth.service"
import { ClientInformation } from '../../models/case/client-information';
import { IonContent, IonPage, IonHeader, IonToolbar, IonThumbnail, IonTitle, IonButtons, IonMenuButton, IonCard, IonList, IonListHeader, IonLabel, IonItem } from '@ionic/react';
import Menu from "../menu/menu";
import logo from "../../images/apprisen-logo.png";

const Profile = () => {

    // const [userId, setUserId] = useState<string>();
    const [clientInfo, setClientInfo] = useState<ClientInformation>({} as ClientInformation);

    useEffect(() => {
        retrieveClientInfo()
    }, [])

    async function retrieveClientInfo() {
        const id = await authService.getCaseId();
        const response = await restService.callClientInformationEndpoint(id);
        console.log(JSON.stringify(response));
        setClientInfo(response);
    }

    return (
        <>
            <Menu pageName={'profile'} />
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonThumbnail class="toolbar-logo" slot={"start"}>
                            <img alt="apprisen-logo" src={logo} />
                        </IonThumbnail>
                        <IonTitle>Profile</IonTitle>
                        <IonButtons slot="end">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent id="profile">
                    <IonCard>
                        <IonList class="ion-no-padding">
                            <IonItem>
                                <IonLabel>
                                    <h3>Name</h3>
                                </IonLabel>
                                <div className={"ion-text-right row-text"}>
                                    {clientInfo.firstName + ' ' + clientInfo.lastName}
                                </div>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>Email</h3>
                                </IonLabel>
                                <div className={"ion-text-right row-text"}>
                                    {clientInfo.emailAddress}
                                </div>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>Phone Number</h3>
                                </IonLabel>
                                <div className={"ion-text-right row-text"}>
                                    {clientInfo.cellPhone}
                                </div>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>Address</h3>
                                </IonLabel>
                                <div className={"ion-text-right row-text"}>
                                    {clientInfo.address1}
                                </div>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>City</h3>
                                </IonLabel>
                                <div className={"ion-text-right row-text"}>
                                    {clientInfo.city}
                                </div>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>State</h3>
                                </IonLabel>
                                <div className={"ion-text-right row-text"}>
                                    {clientInfo.state}
                                </div>
                            </IonItem>
                        </IonList>
                    </IonCard>
                </IonContent>
            </IonPage>
        </>
    )
}

export default Profile;