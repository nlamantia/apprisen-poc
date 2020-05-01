import {
    IonBackButton,
    IonButtons,
    IonCard,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonItem,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React from "react";
import AdditionalResourcesCard from "./additional-resources-card";
import facebookDMP from "../../images/facebook-DMP.jpg";
import unitedWay from "../../images/united-way.jpg";
import cfpb from "../../images/cfpb.png";


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
                <IonCard>
                    <IonItem>  
                        <IonGrid>
                            <IonRow>
                                <IonCol size={"12"} sizeMd={"2"} sizeLg={"3"} className="resources-column">
                                    <AdditionalResourcesCard imageLink={facebookDMP} url="https://www.facebook.com/groups/ApprisenDMPCommunity" title="Facebook DMP Community"/>
                                </IonCol>
                                <IonCol size={"12"} sizeMd={"2"} sizeLg={"3"} className="resources-column">
                                    <AdditionalResourcesCard imageLink={unitedWay} url=" https://www.unitedway.org/" title="United Way"/>  
                                </IonCol>
                                <IonCol size={"12"} sizeMd={"2"} sizeLg={"3"} className="resources-column">
                                    <AdditionalResourcesCard imageLink={cfpb} url="https://www.consumerfinance.gov/consumer-tools/" title="Financial Education Resources"/>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>  
                </IonCard>
            </IonContent>
        </IonPage>
            </>
    )
}

export default AdditionalResources
