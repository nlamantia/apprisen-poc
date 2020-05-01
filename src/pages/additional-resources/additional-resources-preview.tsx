import {
    IonCol, IonCard, IonLabel, IonFabButton, IonIcon, IonRow, IonList, IonListHeader, IonGrid, IonItem, IonImg
} from "@ionic/react";
import React from "react";
import resources from "../../images/resources.png";
import AdditionalResourcesCard from "./additional-resources-card";
import { Link } from "react-router-dom";
import { arrowForward } from "ionicons/icons";
 


const AdditionalResourcesPreview = (props) => {


    return (
            <>
            <IonCard class="color">
               <IonList class="ion-no-padding" lines="none">
                    <IonListHeader class={"white"}>
                        <IonLabel>
                            <h2>Additional Resources</h2>
                        </IonLabel>
                    </IonListHeader>
                    <IonItem lines="inset">
                        <IonLabel>View All</IonLabel>
                        <Link
                            to={{
                            pathname: `/resources`
                            }}
                        >
                            <IonFabButton class={"fab-button"} color={"light"}>
                                <IonIcon className={"arrow-color"} icon={arrowForward} />
                            </IonFabButton>
                        </Link>
                    </IonItem>
                </IonList>.
            </IonCard>    
            </>
    )
}

export default AdditionalResourcesPreview
