import {
    IonCard,
    IonCol,
    IonGrid,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonProgressBar,
    IonRow
} from "@ionic/react";
import React from "react";

const ProgressTrackerCard = (props) => {
    const {startLabel, endLabel, currentLabel, currentProgress} = props;

    return (
        <>
            <IonCard class="color">
                <IonList class="ion-no-padding" lines="none">
                    <IonListHeader class={"white"}>
                        <IonLabel>
                            <h2>Progress</h2>
                        </IonLabel>
                    </IonListHeader>
                    <IonItem style={{padding: 10 + "px " + 10 + "px " + 0 + "px " + 10 + "px"}}>
                        <IonProgressBar value={currentProgress}/>
                    </IonItem>
                    <IonItem>
                        <IonGrid>
                            <IonRow>
                                <IonCol size={"4"}>
                                    <IonLabel class="progress-tracker-label"><h3>Start:</h3><p>{startLabel}</p></IonLabel>
                                </IonCol>
                                <IonCol class="progress-tracker-label center-aligned" size={"4"}>
                                    <IonLabel><h3>Current:</h3><p>{currentLabel}</p></IonLabel>
                                </IonCol>
                                <IonCol class="progress-tracker-label right-aligned" size={"4"}>
                                    <IonLabel><h3>End:</h3><p>{endLabel}</p></IonLabel>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                </IonList>
            </IonCard>
        </>
    )
};
export default ProgressTrackerCard;