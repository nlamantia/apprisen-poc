import {
    IonButtons,
    IonCard,
    IonCol,
    IonContent,
    IonGrid, 
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonPage,
    IonRow,
    IonSkeletonText, 
    IonThumbnail,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { getCredentials } from "../../feature/auth/action";
import { getClientInformation } from "../../feature/client/action";
import logo from "../../images/apprisen-logo.png";
import { ClientInformation } from "../../models/case/client-information";

const _Profile = (props) => {
    const { clientInformation, getClientInformation } = props;
    const { credentials, getCredentials } = props;

    const [userInfo, setUserInfo] = useState<ClientInformation>(null);

    useEffect(() => {
        if (credentials && credentials.linkedApplication) {
            if (!userInfo) {
                if (!clientInformation || !clientInformation.FirstName) {
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
    }, [userInfo, clientInformation, credentials]);

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
                    <IonGrid>
                        <IonRow>
                            <IonCol size={"12"} sizeMd={"8"} sizeLg={"8"} offsetLg={"2"}>
                                <IonCard >
                                    <IonList class="ion-no-padding">
                                        <IonItem>
                                            <IonLabel>
                                                <h3>Name</h3>
                                            </IonLabel>
                                            <IonLabel className={"ion-text-right row-text"}>
                                                <div className={'flex-grid'}>
                                                    <div className={'single-card-grid'} />
                                                    <div className={'single-card-grid'}>
                                                        {userInfo ? userInfo.FirstName + ' ' + userInfo.LastName : <IonSkeletonText animated style={{width: '100%'}} />}
                                                    </div>
                                                </div>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>
                                                <h3>Email</h3>
                                            </IonLabel>
                                            <IonLabel className={"ion-text-right row-text"}>
                                                <div className={'flex-grid'}>
                                                    <div className={'single-card-grid'} />
                                                    <div className={'single-card-grid'}>
                                                        {userInfo ? userInfo.EmailAddress : <IonSkeletonText animated style={{width: '100%'}} />}
                                                    </div>
                                                </div>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>
                                                <h3>Phone Number</h3>
                                            </IonLabel>
                                            <IonLabel className={"ion-text-right row-text"}>
                                                <div className={'flex-grid'}>
                                                    <div className={'single-card-grid'} />
                                                    <div className={'single-card-grid'}>
                                                        {userInfo ? userInfo.CellPhone : <IonSkeletonText animated style={{width: '100%'}} />}
                                                    </div>
                                                </div>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>
                                                <h3>Address</h3>
                                            </IonLabel>
                                            <IonLabel className={"ion-text-right row-text"}>
                                                <div className={'flex-grid'}>
                                                    <div className={'single-card-grid'} />
                                                    <div className={'single-card-grid'}>
                                                        {userInfo ? userInfo.Address1 : <IonSkeletonText animated style={{width: '100%'}} />}
                                                    </div>
                                                </div>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>
                                                <h3>City</h3>
                                            </IonLabel>
                                            <IonLabel className={"ion-text-right row-text"}>
                                                <div className={'flex-grid'}>
                                                    <div className={'single-card-grid'} />
                                                    <div className={'single-card-grid'}>
                                                        {userInfo ? userInfo.City : <IonSkeletonText animated style={{width: '100%'}} />}
                                                    </div>
                                                </div>
                                            </IonLabel>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel>
                                                <h3>State</h3>
                                            </IonLabel>
                                            <IonLabel className={"ion-text-right row-text"}>
                                                <div className={'flex-grid'}>
                                                    <div className={'single-card-grid'} />
                                                    <div className={'single-card-grid'}>
                                                        {userInfo ? userInfo.State : <IonSkeletonText animated style={{width: '100%'}} />}
                                                    </div>
                                                </div>
                                            </IonLabel>
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
