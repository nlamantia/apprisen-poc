import { IonCard, IonFabButton, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonThumbnail, withIonLifeCycle } from "@ionic/react";
import { arrowForward } from "ionicons/icons";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import balance from "../../images/balance.svg";
import calendar from "../../images/calendar.svg";
import goal from "../../images/goal.svg";
import money from "../../images/notes.svg";

class OverviewCard extends Component {
  render() {
    return (
      <>
        <IonCard class="color">
          <IonList class="ion-no-padding">
            <IonListHeader class={"white"}>
              <IonLabel>
                <h2>Account Overview</h2>
              </IonLabel>
              <Link
                to={{
                  pathname: `/account-overview`,
                  state: { caseData: (this.props as any).caseData }
                }}
              >
                <IonFabButton class={"fab-button"} color={"light"}>
                  <IonIcon className={"arrow-color"} icon={arrowForward} />
                </IonFabButton>
              </Link>
            </IonListHeader>
            <IonItem>
              <IonThumbnail class={"icon"} slot={"end"}>
                <img alt="apprisen-logo" src={goal} />
              </IonThumbnail>
              <IonLabel>
                <h3>Remaining Balance</h3>
                <p>${(this.props as any).caseData.currentDebtAmount}</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonThumbnail class={"icon"} slot={"end"}>
                <img alt="apprisen-logo" src={balance} />
              </IonThumbnail>
              <IonLabel>
                <h3>Starting Balance</h3>
                <p>${(this.props as any).caseData.startingDebtAmount}</p>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCard>
        <IonCard>
          <IonList class={"ion-no-padding"}>
            <IonListHeader>
              <IonLabel class={"white"}>
                <h2>Upcoming Payment</h2>
              </IonLabel>
              <Link
                to={{
                  pathname: `/payment-overview`,
                  state: { caseData: (this.props as any).caseData }
                }}
              >
                <IonFabButton class={"fab-button"} color={"light"}>
                  <IonIcon icon={arrowForward} />
                </IonFabButton>
              </Link>
            </IonListHeader>
            <IonItem lines={"inset"}>
              <IonThumbnail class={"icon"} slot={"end"}>
                <img alt="apprisen-logo" src={calendar} />
              </IonThumbnail>
              <IonLabel>
                <h3>Due Date</h3>
                <p>{(this.props as any).caseData.nextPaymentDate}</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonThumbnail class={"icon"} slot={"end"}>
                <img alt="apprisen-logo" src={money} />
              </IonThumbnail>
              <IonLabel>
                <h3>Amount Due</h3>
                <p>${(this.props as any).caseData.nextPaymentAmount}</p>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCard>
      </>
    );
  }
}

export default withIonLifeCycle(OverviewCard);
