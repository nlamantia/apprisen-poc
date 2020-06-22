import { IonCard, IonFabButton, IonIcon, IonItem, IonLabel, IonList, IonListHeader } from "@ionic/react";
import { arrowForward } from "ionicons/icons";
import React from "react";
import { Link } from "react-router-dom";
 


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
