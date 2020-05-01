import React from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonContent, IonCardContent, IonImg, IonList, IonListHeader, IonLabel, IonFabButton, IonIcon} from "@ionic/react";
// eslint-disable-next-line
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { ResourceInput } from "models/resources/resource-card-input";
import { arrowForward } from "ionicons/icons";


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
