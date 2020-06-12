// eslint-disable-next-line
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { IonCard, IonFabButton, IonIcon, IonLabel, IonList, IonListHeader } from "@ionic/react";
import { arrowForward } from "ionicons/icons";
import { ResourceInput } from "models/resources/resource-card-input";
import React from "react";


const AdditionalResourcesCard = (props : ResourceInput) => {

    const {title, url, imageLink} = props;


    const handleClick = () => {
        InAppBrowser.create(url,'_system', 'location=yes');
    }

    return (
        <IonCard class="resources">
            <IonList class="ion-no-padding" lines="none">
                <IonListHeader class={"white"}>
                    <IonLabel>
                        <h2>{title}</h2>
                    </IonLabel>
                    <IonFabButton class={"fab-button"} color={"light"}>
                        <IonIcon className={"arrow-color"} icon={arrowForward} onClick={handleClick}/>
                    </IonFabButton>
                </IonListHeader>
                <img src={imageLink}/>
            </IonList>
        </IonCard>
    )
}

export default AdditionalResourcesCard
