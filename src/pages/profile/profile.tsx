import React, { useState, useEffect } from 'react';
import { restService } from '../../services/rest.service';
import authService from "../../services/auth.service"
import { ClientInformation } from '../../models/case/client-information';
import { IonContent, IonPage, IonHeader, IonToolbar, IonThumbnail, IonTitle, IonButtons, IonMenuButton, IonCard, IonList, IonListHeader, IonLabel, IonItem } from '@ionic/react';
import Menu from "../menu/menu";
import logo from "../../images/apprisen-logo.png";
import {connect} from 'react-redux'
import {getClientInformation} from "../../feature/client/action";
import {bindActionCreators} from "redux";

const _Profile = (props) => {
    const { clientInformation, getClientInformation } = props
    useEffect(() => {
        if (!clientInformation) {
            getClientInformation()
        }
    })

    // @ts-ignore
    return (
        <>
            {/*<Menu pageName={'profile'} /> todo error on this for some reason*/}
            <Menu />
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
                                    {clientInformation.firstName + ' ' + clientInformation.lastName}
                                </div>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>Email</h3>
                                </IonLabel>
                                <div className={"ion-text-right row-text"}>
                                    {clientInformation.emailAddress}
                                </div>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>Phone Number</h3>
                                </IonLabel>
                                <div className={"ion-text-right row-text"}>
                                    {clientInformation.cellPhone}
                                </div>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>Address</h3>
                                </IonLabel>
                                <div className={"ion-text-right row-text"}>
                                    {clientInformation.address1}
                                </div>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>City</h3>
                                </IonLabel>
                                <div className={"ion-text-right row-text"}>
                                    {clientInformation.city}
                                </div>
                            </IonItem>
                            <IonItem>
                                <IonLabel>
                                    <h3>State</h3>
                                </IonLabel>
                                <div className={"ion-text-right row-text"}>
                                    {clientInformation.state}
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
        clientInformation: state.clientInformation
    }),
    dispatch => bindActionCreators({
        getClientInformation
    }, dispatch)
)(
    _Profile
);


export default Profile;
