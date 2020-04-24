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
 


const AdditionalResourcesBudget = (props) => {


    return (
            <>
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                <IonBackButton defaultHref="/overview" />
                </IonButtons>
                <IonTitle>Budget Resources</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonItem>  
                        <IonGrid>
                            <IonRow>
                                <IonCol size={"12"} sizeMd={"2"} sizeLg={"4"} className="resources-column">
                                    <AdditionalResourcesCard imageLink="https://www.apprisen.com/wp-content/uploads/2019/10/Simple-Steps-to-Save-Money_Thumbnail-1.png" url="https://www.apprisen.com/wp-content/uploads/2019/10/Savings_Goals_Worksheet.pdf" title="Savings Goal Worksheet"/>
                                </IonCol>
                                <IonCol size={"12"} sizeMd={"2"} sizeLg={"4"} className="resources-column">
                                    <AdditionalResourcesCard imageLink="https://www.apprisen.com/wp-content/uploads/2019/08/upcoming-events3.png" url="https://www.apprisen.com/wp-content/uploads/2019/10/fritterfinder-2.pdf" title="Fritter Finder"/>  
                                </IonCol>
                                <IonCol size={"12"} sizeMd={"2"} sizeLg={"4"} className="resources-column">
                                    <AdditionalResourcesCard imageLink="https://www.apprisen.com/wp-content/uploads/2019/08/resources-mm-2.png" url="https://www.apprisen.com/wp-content/uploads/2019/10/periodic-expense-worksheet.pdf" title="Periodic Expense Worksheet"/>
                                </IonCol>
                                <IonCol size={"12"} sizeMd={"2"} sizeLg={"4"} className="resources-column">
                                    <AdditionalResourcesCard imageLink="https://www.apprisen.com/wp-content/uploads/2019/10/Personal-Cashflow-Statement_Thumbnail.png" url="https://www.apprisen.com/wp-content/uploads/2019/10/checkbook-balance-form.pdf" title="Checkbook Balance Form"/>
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

export default AdditionalResourcesBudget
