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

class PaymentOverview extends Component {
  state = {
    caseData: {} as CaseData,
    lenders: [] as Lender[]
  };

  ionViewWillEnter() {
    this.setState({
      caseData: (this.props as any).caseData.history.location.state.caseData,
      lenders: (this.props as any).caseData.history.location.state.caseData
        .lenders
    });
  }

  render() {
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

                    {this.state.lenders.map(lender => {
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
                          <b>${this.state.caseData.nextPaymentAmount}</b>
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
                      {this.state.lenders.length > 0 && (
                        <Doughnut
                          data={{
                            labels: this.state.lenders.map(
                              lender => lender.lenderName
                            ),
                            datasets: [
                              {
                                data: this.state.lenders.map(
                                  lender => lender.nextPaymentAmount
                                ),
                                backgroundColor: [
                                  "#FF6384",
                                  "#36A2EB",
                                  "#FFCE56",
                                  "#64fb6f"
                                ],
                                hoverBackgroundColor: [
                                  "#FF6384",
                                  "#36A2EB",
                                  "#FFCE56"
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
} export default withIonLifeCycle(PaymentOverview);
