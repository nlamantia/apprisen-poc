import {
    IonCard,
    IonCol,
    IonGrid,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonProgressBar,
    IonRow, IonSkeletonText
} from "@ionic/react";
import React from "react";

const ProgressTrackerCard = (props) => {
    const {startLabel, endLabel, currentLabel, currentProgress} = props;

    const createSkeletonText = () => {
        return(
            <div className={'progress-tracker-skeleton'}>
                <IonSkeletonText animated />
            </div>
        );
    };

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
                                <IonCol class="progress-tracker-label" size={"4"}>
                                    <IonLabel className="ion-text-wrap"><h3>Original Balance:</h3><p>{startLabel ? startLabel : createSkeletonText()}</p></IonLabel>
                                </IonCol>
                                <IonCol class="progress-tracker-label center-aligned" size={"4"}>
                                    <IonLabel className="ion-text-wrap"><h3>Current Monthly Payment:</h3><p>{currentLabel ? currentLabel : createSkeletonText()}</p></IonLabel>
                                </IonCol>
                                <IonCol class="progress-tracker-label right-aligned" size={"4"}>
                                    <IonLabel className="ion-text-wrap"><h3>Current Balance:</h3><p>{endLabel ? endLabel : createSkeletonText()}</p></IonLabel>
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