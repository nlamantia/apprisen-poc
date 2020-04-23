import React from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonContent} from "@ionic/react";
// eslint-disable-next-line
import { InAppBrowser } from "@ionic-native/in-app-browser";


const AdditionalResourcesCard = (props) => {

    const {name, url, imageLink} = props;


    const handleCardClick = (url) => {
        InAppBrowser.create(url,'_system', 'location=yes');
    }

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{name}</IonCardTitle>
            </IonCardHeader>
            <IonContent onClick={() => handleCardClick({url})}>
                <img src={imageLink}/>
            </IonContent>
        </IonCard>
    )
}

export default AdditionalResourcesCard
