import {
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonRow,
    IonThumbnail,
    IonTitle,
    IonToast,
    IonToolbar,
    IonFooter,
    IonIcon,
    IonButton,
    IonCard,
    IonList,
    IonBackButton,
    IonListHeader,
    IonLabel,
    IonItem
} from "@ionic/react";
import React, {useEffect, useState} from "react";
import logo from "../../images/apprisen-logo.png";
import SocialMediaFooter from "pages/common/social-media-footer";
import AdditionalResourcesCard from "./additional-resources-card";
 


const AdditionalResources = (props) => {


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
            <IonGrid>
                <IonRow>
                    <IonCol size={"4"} sizeMd={"3"}>
                        <AdditionalResourcesCard imageLink={logo} url="www.google.com" name="Test"/>
                    </IonCol>
                </IonRow>
            </IonGrid>
            </IonContent>
            <SocialMediaFooter/>
        </IonPage>
            </>
    )
}

export default AdditionalResources
