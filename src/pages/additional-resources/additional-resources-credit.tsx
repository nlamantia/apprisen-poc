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
 


const AdditionalResourcesCredit = (props) => {


    return (
            <>
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                <IonBackButton defaultHref="/overview" />
                </IonButtons>
                <IonTitle>Credit Report Resources</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonItem>  
                        <IonGrid>
                            <IonRow>
                                <IonCol size={"12"} sizeMd={"2"} sizeLg={"4"} className="resources-column">
                                    <AdditionalResourcesCard imageLink="https://www.apprisen.com/wp-content/uploads/2019/08/hero6.png" url="https://www.consumer.ftc.gov/articles/pdf-0093-annual-report-request-form.pdf" title="Credit Report Request Form"/>
                                </IonCol>
                                <IonCol size={"12"} sizeMd={"2"} sizeLg={"4"} className="resources-column">
                                    <AdditionalResourcesCard imageLink="https://www.apprisen.com/wp-content/uploads/2019/08/hero1.png" url="https://www.annualcreditreport.com/index.action" title="AnnualCreditReport.com"/>  
                                </IonCol>
                                <IonCol size={"12"} sizeMd={"2"} sizeLg={"4"} className="resources-column">
                                    <AdditionalResourcesCard imageLink="https://www.apprisen.com/wp-content/uploads/2019/08/resources-mm-1.png" url="https://www.myfico.com/credit-education/what-is-a-fico-score" title="Scoreinfo.gov"/>
                                </IonCol>
                                <IonCol size={"12"} sizeMd={"2"} sizeLg={"4"} className="resources-column">
                                    <AdditionalResourcesCard imageLink="https://www.apprisen.com/wp-content/uploads/2019/08/resources-workshop.png" url="https://www.consumer.ftc.gov/" title="FTC.gov"/>
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

export default AdditionalResourcesCredit
