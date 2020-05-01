import {
    IonBackButton,
    IonButtons,
    IonCard,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonThumbnail,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React from "react";
import facebookDMP from "../../images/facebook-apprisen.png";
import unitedWay from "../../images/united-way.jpg";
import cfpb from "../../images/cfpb.png";
import {InAppBrowser} from "@ionic-native/in-app-browser";


const AdditionalResources = (props) => {

    const handleClick = (url: string) => {
        InAppBrowser.create(url,'_system', 'location=yes');
    }

    return (
            <>
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                <IonBackButton defaultHref="/overview" />
                </IonButtons>
                <IonTitle>Additional Resources</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard class="color">
                    <IonList class="ion-no-padding">
                        <IonListHeader class={"white"}>
                            <IonLabel>
                                <h2>Additional Resources</h2>
                            </IonLabel>
                        </IonListHeader>
                        <IonItem>
                            <IonThumbnail class={"icon"} slot={"start"}>
                                <img alt="Facebook DMP Community" src={facebookDMP}/>
                            </IonThumbnail>
                            <IonLabel>
                                <h3 onClick={(e) => handleClick("https://www.facebook.com/groups/ApprisenDMPCommunity")}>Facebook DMP Community</h3>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonThumbnail class={"icon"} slot={"start"}>
                                <img alt="United Way" src={unitedWay}/>
                            </IonThumbnail>
                            <IonLabel>
                                <h3 onClick={(e) => handleClick("https://www.unitedway.org/")}>United Way</h3>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonThumbnail class={"icon"} slot={"start"}>
                                <img alt="Financial Education Resources" src={cfpb}/>
                            </IonThumbnail>
                            <IonLabel>
                                <h3 onClick={(e) => handleClick("https://www.consumerfinance.gov/consumer-tools/")}>Financial Education Resources</h3>
                            </IonLabel>
                        </IonItem>
                    </IonList>
                </IonCard>
            </IonContent>
        </IonPage>
            </>
    )
}

export default AdditionalResources
