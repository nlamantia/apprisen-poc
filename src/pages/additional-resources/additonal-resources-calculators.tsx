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
import SocialMediaFooter from "pages/common/social-media-footer";
import AdditionalResourcesCard from "./additional-resources-card";
 


const AdditionalResourcesCalculators = (props) => {


    return (
            <>
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                <IonBackButton defaultHref="/overview" />
                </IonButtons>
                <IonTitle>Calculators</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonItem>  
                        <IonGrid>
                            <IonRow>
                                <IonCol size={"12"} sizeMd={"2"} sizeLg={"4"} className="resources-column">
                                    <AdditionalResourcesCard imageLink="https://www.apprisen.com/wp-content/uploads/2019/08/hero9.png" url="https://www.apprisen.com/financial-calculators/" title="Financial Calculators"/>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>  
                </IonCard>
            </IonContent>
            <SocialMediaFooter/>
        </IonPage>
            </>
    )
}

export default AdditionalResourcesCalculators
