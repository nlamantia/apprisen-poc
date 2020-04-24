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
 


const AdditionalResourcesQuickTips = (props) => {


    return (
            <>
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                <IonBackButton defaultHref="/overview" />
                </IonButtons>
                <IonTitle>Quick Tips</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonItem>  
                        <IonGrid>
                            <IonRow>
                                <IonCol size={"12"} sizeMd={"2"} sizeLg={"4"} className="resources-column">
                                    <AdditionalResourcesCard imageLink="https://www.apprisen.com/wp-content/uploads/2019/10/Five-Causes-of-Financial-Distress.png" url="https://www.apprisen.com/the-top-five-causes-of-financial-distress-2/" title="Causes of Financial Distress"/>
                                </IonCol>
                                <IonCol size={"12"} sizeMd={"2"} sizeLg={"4"} className="resources-column">
                                    <AdditionalResourcesCard imageLink="https://www.apprisen.com/wp-content/uploads/2019/10/Coping-with-Past-Due-Bills_Thumbnail.png" url="https://www.apprisen.com/coping-with-past-due-bills/" title="Coping with Past Due Bills"/>  
                                </IonCol>
                                <IonCol size={"12"} sizeMd={"2"} sizeLg={"4"} className="resources-column">
                                    <AdditionalResourcesCard imageLink="https://www.apprisen.com/wp-content/uploads/2019/10/8-Free-Ways-to-Have-Fun-This-Summer_Thumbnail.png" url="https://www.apprisen.com/8-free-ways-to-have-fun-this-summer/" title="Free Ways to Have Summer Fun"/>
                                </IonCol>
                                <IonCol size={"12"} sizeMd={"2"} sizeLg={"4"} className="resources-column">
                                    <AdditionalResourcesCard imageLink="https://www.apprisen.com/wp-content/uploads/2019/10/Creating-a-Plan-for-Holiday-Spending_Thumbnail.png" url="https://www.apprisen.com/holiday-spending-plan/" title="Holiday Spending Plan"/>
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

export default AdditionalResourcesQuickTips
