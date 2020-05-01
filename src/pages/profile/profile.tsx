import React, {useEffect, useState} from 'react';
import {
    IonButtons,
    IonCard,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonPage,
    IonThumbnail,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import logo from "../../images/apprisen-logo.png";
import {connect} from 'react-redux'
import {getClientInformation} from "../../feature/client/action";
import {bindActionCreators} from "redux";
import {getCredentials} from "../../feature/auth/action";
import {ClientInformation} from "../../models/case/client-information";

const _Profile = (props) => {
    const { clientInformation, getClientInformation } = props;
    const { credentials, getCredentials } = props;

    const [userInfo, setUserInfo] = useState<ClientInformation>(null);

    useEffect(() => {
        if (credentials && credentials.linkedApplication) {
            if (!userInfo) {
                if (!clientInformation || !clientInformation.firstName) {
                    console.log("getting client information");
                    getClientInformation()
                } else {
                    setUserInfo(clientInformation);
                }
            }
        } else {
            console.log("getting credentials");
            getCredentials();
        }
    }, [userInfo, clientInformation, credentials])

    // @ts-ignore
    return (
        <>
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
                                    {userInfo ? userInfo.firstName + ' ' + userInfo.lastName : ""}
                                </div>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>Email</h3>
                                </IonLabel>
                                <div className={"ion-text-right row-text"}>
                                    {userInfo ? userInfo.emailAddress : ""}
                                </div>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>Phone Number</h3>
                                </IonLabel>
                                <div className={"ion-text-right row-text"}>
                                    {userInfo ? userInfo.cellPhone : ""}
                                </div>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>Address</h3>
                                </IonLabel>
                                <div className={"ion-text-right row-text"}>
                                    {userInfo ? userInfo.address1 : ""}
                                </div>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>City</h3>
                                </IonLabel>
                                <div className={"ion-text-right row-text"}>
                                    {userInfo ? userInfo.city : ""}
                                </div>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>State</h3>
                                </IonLabel>
                                <div className={"ion-text-right row-text"}>
                                    {userInfo ? userInfo.state : ""}
                                </div>
                            </IonItem>
                        </IonList>
                    </IonCard>
                </IonContent>
            </IonPage>
        </>
    )
}


const Profile = connect(
    state => ({
        credentials: state.auth.credentials,
        clientInformation: state.client.clientInformation
    }),
    dispatch => bindActionCreators({
        getClientInformation,
        getCredentials
    }, dispatch)
)(
    _Profile
);


export default Profile;
