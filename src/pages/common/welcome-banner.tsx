import {IonCard, IonItem, IonLabel} from "@ionic/react";
import React from "react";
import iris from "../../images/iris-transparent.png";

const WelcomeBanner = (props) => {
    return (
        <>
            <IonCard class="banner-text">
                <IonItem class="welcome-banner">
                    <img alt="logo" src={iris} className="welcome-image-right"/>
                    <IonLabel className="ion-text-wrap">
                        Welcome to the Apprisen Portal
                    </IonLabel>
                    <img alt="iris" src={iris} className="welcome-image" style={{visibility: 'hidden'}}/>
                </IonItem>
            </IonCard>
        </>
    )
};
export default WelcomeBanner;