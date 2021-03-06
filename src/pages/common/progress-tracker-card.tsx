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
    IonSkeletonText
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
                                <IonCol class="progress-tracker-label" size={"4"}>
                                    <IonLabel className="ion-text-wrap">
                                        <h3>Original Balance:</h3>
                                        <div className={'flex-grid'}>
                                            <div>
                                                {startLabel ? startLabel : <IonSkeletonText animated />}
                                            </div>
                                            <div />
                                            <div />
                                        </div>
                                    </IonLabel>
                                </IonCol>
                                <IonCol class="progress-tracker-label center-aligned" size={"4"}>
                                    <IonLabel className="ion-text-wrap">
                                        <h3>Current Monthly Payment:</h3>
                                        <div className={'flex-grid'}>
                                            <div />
                                            <div>
                                                {currentLabel ? currentLabel : <IonSkeletonText animated />}
                                            </div>
                                            <div />
                                        </div>
                                    </IonLabel>
                                </IonCol>
                                <IonCol class="progress-tracker-label right-aligned" size={"4"}>
                                    <IonLabel className="ion-text-wrap">
                                        <h3>Current Balance:</h3>
                                        <div className={'flex-grid'}>
                                            <div />
                                            <div />
                                            <div>
                                                {endLabel ? endLabel : <IonSkeletonText animated />}
                                            </div>
                                        </div>
                                    </IonLabel>
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