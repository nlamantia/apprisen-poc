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
 


const AdditionalResourcesFinancial = (props) => {


    return (
            <>
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                <IonBackButton defaultHref="/overview" />
                </IonButtons>
                <IonTitle>Financial Resources</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonItem>  
                        <IonGrid>
                            <IonRow>
                                <IonCol size={"12"} sizeMd={"2"} sizeLg={"4"} className="resources-column">
                                    <AdditionalResourcesCard imageLink="https://www.apprisen.com/wp-content/uploads/2019/10/FHP_4.png" url="https://www.apprisen.com/wp-content/uploads/2019/10/Net_Worth_Statement.pdf" title="Net Worth Statement"/>
                                </IonCol>
                                <IonCol size={"12"} sizeMd={"2"} sizeLg={"4"} className="resources-column">
                                    <AdditionalResourcesCard imageLink="https://www.apprisen.com/wp-content/uploads/2019/08/resources-4.png" url="https://www.apprisen.com/wp-content/uploads/2019/10/basic-cash-flow-statement.pdf" title="Debt Ratio Analysis"/>  
                                </IonCol>
                                <IonCol size={"12"} sizeMd={"2"} sizeLg={"4"} className="resources-column">
                                    <AdditionalResourcesCard imageLink="https://www.apprisen.com/wp-content/uploads/2019/08/resources-3.png" url="https://www.apprisen.com/wp-content/uploads/2019/10/debt-ratio-analysis.pdf" title="Debt Test"/>
                                </IonCol>
                                <IonCol size={"12"} sizeMd={"2"} sizeLg={"4"} className="resources-column">
                                    <AdditionalResourcesCard imageLink="https://www.apprisen.com/wp-content/uploads/2019/08/hero3.png" url="https://www.apprisen.com/wp-content/uploads/2019/10/debt-test.pdf" title="Basic Cash Flow Statement"/>
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

export default AdditionalResourcesFinancial
