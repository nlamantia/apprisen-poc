import {IonCard, IonFabButton, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonProgressBar} from '@ionic/react';
import React from "react";
import {arrowForward} from "ionicons/icons";

const ProgressTracker = (props) => {
    const {startLabel, endLabel, currentProgress} = props

    // useEffect(
    //     () => {
    //         const { getCaseSummary, getDebts } = props
    //         if (!caseSummary || caseSummary === {})
    //           getCaseSummary();
    //         if (!debts || debts === {})
    //           getDebts();
    //     }, []);
    //
    return (
        <>
            <IonCard class="color">
                <IonList class="ion-no-padding">
                    <IonListHeader class={"white"}>
                        <IonLabel>
                            <h2>Progress</h2>
                        </IonLabel>
                        <IonFabButton class={"fab-button"} color={"light"}>
                            <IonIcon className={"arrow-color"} icon={arrowForward}/>
                        </IonFabButton>
                    </IonListHeader>
                    <IonItem style={{padding: 10 + "px"}}>
                        <IonProgressBar value={currentProgress}/>
                    </IonItem>
                </IonList>
            </IonCard>
        </>
    )
};

export default ProgressTracker