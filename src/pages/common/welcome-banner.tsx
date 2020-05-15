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

const WelcomeBanner = (props) => {
    

    return (
        <>
            <IonCard>
                    <IonItem class="toolbar-header">
                        <IonThumbnail class={"welcome-image"} slot={"start"}>
                                <img alt="iris" src={iris}/>
                        </IonThumbnail>
                        <IonLabel>
                                Welcome to the Apprisen Client Portal
                        </IonLabel>
                    </IonItem>
            </IonCard>
        </>
    )
};
export default WelcomeBanner;