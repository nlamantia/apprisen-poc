import {IonCard, IonItem, IonLabel} from "@ionic/react";
import React from "react";

const WelcomeBanner = (props) => {
    return (
        <>
            <IonCard class="banner-text">
                <IonItem class="welcome-banner">
                    <img alt="logo" src={"/images/iris-transparent.png"} className="welcome-image-right"/>
                    <IonLabel className="ion-text-wrap">
                        Welcome to the Apprisen Portal
                    </IonLabel>
                    <img alt="iris" src={"/images/iris-transparent.png"} className="welcome-image" style={{visibility: 'hidden'}}/>
                </IonItem>
            </IonCard>
        </>
    )
};
export default WelcomeBanner;