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
                        <IonLabel>Financial</IonLabel>
                        <Link
                            to={{
                            pathname: `/resources/financial`
                            }}
                        >
                            <IonFabButton class={"fab-button"} color={"light"}>
                                <IonIcon className={"arrow-color"} icon={arrowForward} />
                            </IonFabButton>
                        </Link>
                    </IonItem>
                    <IonItem lines="inset">
                        <IonLabel>Budget, Planning & Saving</IonLabel>
                        <Link
                            to={{
                            pathname: `/resources/budget`
                            }}
                        >
                            <IonFabButton class={"fab-button"} color={"light"}>
                                <IonIcon className={"arrow-color"} icon={arrowForward} />
                            </IonFabButton>
                        </Link>
                    </IonItem>
                    <IonItem lines="inset">
                        <IonLabel>Calculators</IonLabel>
                        <Link
                            to={{
                            pathname: `/resources/calculators`
                            }}
                        >
                            <IonFabButton class={"fab-button"} color={"light"}>
                                <IonIcon className={"arrow-color"} icon={arrowForward} />
                            </IonFabButton>
                        </Link>
                    </IonItem>
                    <IonItem lines="inset">
                        <IonLabel>Credit Report Resources</IonLabel>
                        <Link
                            to={{
                            pathname: `/resources/credit`
                            }}
                        >
                            <IonFabButton class={"fab-button"} color={"light"}>
                                <IonIcon className={"arrow-color"} icon={arrowForward} />
                            </IonFabButton>
                        </Link>
                    </IonItem>
                    <IonItem lines="inset">
                        <IonLabel>Quick Tips</IonLabel>
                        <Link
                            to={{
                            pathname: `/resources/quicktips`
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
