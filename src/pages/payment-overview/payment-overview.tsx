import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  withIonLifeCycle
} from "@ionic/react";
import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import Payment from "../../images/payment.svg";
import { CaseData } from "../../models/case/case-data";
import { Lender } from "../../models/lender";

export const PaymentOverview = (props) => {
    const { caseData: { history: { location: { state: { caseData : lenders }, caseData } } } } = (this.props as any)
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/overview" />
            </IonButtons>
            <IonTitle>Monthly Payment Details</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol size={"12"} sizeMd={"6"}>
                <IonCard>
                  <IonList class="ion-no-padding">
                    <IonListHeader
                      class={"white ion-text-center ion-padding-end"}
                    >
                      <IonLabel>
                        <h2>Payment Breakdown</h2>
                      </IonLabel>
                      <IonThumbnail class={"icon"}>
                        <img alt="apprisen-logo" src={Payment} />
                      </IonThumbnail>
                    </IonListHeader>

                    {lenders.map(lender => {
                      return (
                        <IonItem>
                          <IonLabel>
                            <h3>{lender.lenderName}</h3>
                          </IonLabel>
                          <IonLabel>
                            <h3 className={"ion-text-right"}>
                              ${lender.nextPaymentAmount.toFixed(2)}
                            </h3>
                          </IonLabel>
                        </IonItem>
                      );
                    })}
                    <IonItem>
                      <IonLabel>
                        <h3>
                          <b>Total Amount</b>
                        </h3>
                      </IonLabel>
                      <IonLabel>
                        <h3 className={"ion-text-right"}>
                          <b>${caseData.nextPaymentAmount}</b>
                        </h3>
                      </IonLabel>
                    </IonItem>
                    <IonItem class={"ion-float-end"}>
                      <IonButton
                        fill="clear"
                        className={"ion-float-end lender-button"}
                      >
                        Make Payment
                      </IonButton>
                    </IonItem>
                  </IonList>
                </IonCard>
              </IonCol>
              <IonCol size={"12"} sizeMd={"6"}>
                <IonCard>
                  <IonItem className={"ion-no-padding"}>
                    <div className={"chart-div ion-padding-vertical"}>
                      {lenders.length > 0 && (
                        <Doughnut
                          data={{
                            labels: lenders.map(
                              lender => lender.lenderName
                            ),
                            datasets: [
                              {
                                data: lenders.map(
                                  lender => lender.nextPaymentAmount
                                ),
                                backgroundColor: [
                                  "#439539",
                                  "#007FB2",
                                  "#FAA634",
                                  "#008752"
                                ],
                                hoverBackgroundColor: [
                                  "#439539",
                                  "#007FB2",
                                  "#FAA634",
                                  "#008752"
                                ]
                              }
                            ]
                          }}
                          options={{
                            legend: {
                              display: true,
                              position: "left"
                            },

                          }}
                        />
                      )}
                    </div>
                  </IonItem>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
}

export default PaymentOverview
