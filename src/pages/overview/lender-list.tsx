import React, { Component } from "react";
import { IonButton, IonItem, IonLabel, IonList, IonThumbnail, withIonLifeCycle } from "@ionic/react";
import bank from "../../images/bank.svg";
import { Link } from "react-router-dom";

class LenderList extends Component {

    render() {
        return (
            <IonList lines={'full'} class={'ion-no-padding margin-top'}>
                <IonItem>
                    <IonLabel>
                        <h2>Lenders</h2>
                    </IonLabel>
                    <IonLabel>
                        <h2>Balance</h2>
                    </IonLabel>
                    <IonThumbnail class={'icon'}>
                        <img alt="apprisen-logo" src={bank} />
                    </IonThumbnail>
                </IonItem>
                {(this.props as any).lenders.map((lender: any, i: any) => {
                    return (
                        <IonItem key={i}>
                            <IonLabel><h3>{lender.lenderName}</h3></IonLabel>
                            <IonLabel><h3>${lender.remainingDebtBalance}</h3></IonLabel>
                            <Link
                                to={{
                                    pathname: `/lender-overview`,
                                    state: { lender: lender }
                                }}
                            >
                                <IonButton fill={'clear'} className={'lender-button'}>Info</IonButton>
                            </Link>
                        </IonItem>
                    )
                })}
            </IonList>
        )
    }


}

export default withIonLifeCycle(LenderList)
