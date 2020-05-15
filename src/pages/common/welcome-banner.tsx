import {
    IonCard,
    IonCol,
    IonGrid,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonProgressBar,
    IonRow,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonThumbnail
} from "@ionic/react";
import React from "react";
import iris from "../../images/iris.png";
import logo from "../../images/apprisen-logo.png";

const WelcomeBanner = (props) => {
    

    return (
        <>
            <IonCard class="banner-text">
                    <IonItem class="welcome-banner">

 <img alt="logo" src={logo} className="welcome-image-right"/>
                           
                        <IonLabel className="ion-text-wrap">
                                Welcome to the Apprisen Portal
                        </IonLabel>
 <img alt="iris" src={iris} className="welcome-image"/>  

                           
                    </IonItem>
            </IonCard>
        </>
    )
};
export default WelcomeBanner;