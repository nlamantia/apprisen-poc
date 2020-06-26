import { InAppBrowser } from "@ionic-native/in-app-browser";
import {
    IonBackButton,
    IonButtons,
    IonCard,
    IonCol, 
    IonContent,
    IonFooter, 
    IonGrid, 
    IonHeader,
    IonMenuButton,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonRow, IonThumbnail,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React from "react";


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
                <IonButtons slot="end">
                        <IonMenuButton />
                </IonButtons>
            </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonGrid>
                <IonRow>
                    <IonCol size={"12"} sizeMd={"8"} sizeLg={"8"} offsetLg={"2"}>
                        <IonCard class="color">
                            <IonList class="ion-no-padding">
                                <IonListHeader class={"white"}>
                                    <IonLabel>
                                        <h2>Additional Resources</h2>
                                    </IonLabel>
                                </IonListHeader>
                                <IonItem>
                                    <IonThumbnail class={"icon"} slot={"start"}>
                                        <img alt="Facebook DMP Community" src={"/images/facebook-apprisen.png"}/>
                                    </IonThumbnail>
                                    <IonLabel>
                                        <h3 onClick={(e) => handleClick("https://www.facebook.com/groups/ApprisenDMPCommunity")}>Facebook DMP Community</h3>
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonThumbnail class={"icon"} slot={"start"}>
                                        <img alt="Apprisen Money Minute Blog" src={"/images/apprisen-logo.png"}/>
                                    </IonThumbnail>
                                    <IonLabel>
                                        <h3 onClick={(e) => handleClick("https://www.apprisen.com/blog/")}>Money Minute Blog</h3>
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonThumbnail class={"icon"} slot={"start"}>
                                        <img alt="United Way" src={"/images/united-way.jpg"}/>
                                    </IonThumbnail>
                                    <IonLabel>
                                        <h3 onClick={(e) => handleClick("https://www.unitedway.org/")}>United Way</h3>
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonThumbnail class={"icon"} slot={"start"}>
                                        <img alt="Financial Education Resources" src={"/images/cfpb.png"}/>
                                    </IonThumbnail>
                                    <IonLabel>
                                        <h3 onClick={(e) => handleClick("https://www.consumerfinance.gov/consumer-tools/")}>Financial Education Resources</h3>
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonThumbnail class={"icon"} slot={"start"}>
                                        <img alt="Apprisen Resources" src={"/images/apprisen-logo.png"}/>
                                    </IonThumbnail>
                                    <IonLabel>
                                        <h3 onClick={(e) => handleClick("https://www.apprisen.com/resources/")}>Apprisen Resources</h3>
                                    </IonLabel>
                                </IonItem>
                            </IonList>
                        </IonCard>
                        <IonCard class="color">
                            <IonList class="ion-no-padding">
                                <IonListHeader class={"white"}>
                                    <IonLabel>
                                        <h2>Social Media</h2>
                                    </IonLabel>
                                </IonListHeader>
                                <IonItem>
                                    <IonThumbnail class={"icon"} slot={"start"}>
                                        <img alt="Apprisen Facebook Page" src={"/images/facebook-apprisen.png"}/>
                                    </IonThumbnail>
                                    <IonLabel>
                                        <h3 onClick={(e) => handleClick("https://www.facebook.com/Apprisen/")}>Facebook</h3>
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonThumbnail class={"icon"} slot={"start"}>
                                        <img alt="Apprisen Facebook Page" src={"/images/instagram.png"}/>
                                    </IonThumbnail>
                                    <IonLabel>
                                        <h3 onClick={(e) => handleClick("https://www.instagram.com/apprisenempowers/")}>Instagram</h3>
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonThumbnail class={"icon"} slot={"start"}>
                                        <img alt="Apprisen Facebook Page" src={"/images/twitter.jpg"}/>
                                    </IonThumbnail>
                                    <IonLabel>
                                        <h3 onClick={(e) => handleClick("https://twitter.com/Apprisen")}>Twitter</h3>
                                    </IonLabel>
                                </IonItem>
                            </IonList>
                        </IonCard>
                    </IonCol>
                </IonRow>
            </IonGrid>
            <IonFooter className="ion-no-border"/>
            </IonContent>
        </IonPage>
            </>
    )
}

export default AdditionalResources
