import { IonBackButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRow, IonTitle, IonToolbar, withIonLifeCycle } from "@ionic/react";
import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
import { CaseData } from "../../models/case-data";

class AccountOverview extends Component {
  state = {
    caseData: {} as CaseData
  };

  ionViewWillEnter() {
    this.setState({
      caseData: (this.props as any).caseData.history.location.state.caseData
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
            <IonTitle>Account Overview</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol size={"12"} sizeMd={"6"}>
                <IonCard>
                  <IonList class="ion-no-padding">
                    <IonListHeader class={"white ion-text-center ion-padding-end"}>
                      <IonLabel>
                        <h2>Account Overview</h2>
                      </IonLabel>
                    </IonListHeader>
                    <IonItem>
                      <IonLabel>
                        <h3>Case Start Date</h3>
                      </IonLabel>
                      <IonLabel>
                        <h3 className={"ion-text-right"}>
                          {this.state.caseData.caseInceptionDate}
                        </h3>
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>
                        <h3>
                          Starting Balance
					  	          </h3>
                      </IonLabel>
                      <IonLabel>
                        <h3 className={"ion-text-right"}>
                          ${this.state.caseData.startingDebtAmount}
                        </h3>
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>
                        <h3>
                          Current Balance
						            </h3>
                      </IonLabel>
                      <IonLabel>
                        <h3 className={"ion-text-right"}>
                          ${this.state.caseData.currentDebtAmount}
                        </h3>
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>
                        <h3>
                          Monthly Payment
						            </h3>
                      </IonLabel>
                      <IonLabel>
                        <h3 className={"ion-text-right"}>
                          ${this.state.caseData.nextPaymentAmount}
                        </h3>
                      </IonLabel>
                    </IonItem>
                  </IonList>
                </IonCard>
                <IonCard>
                  <IonListHeader class={"white ion-text-center ion-padding-end"}>
                    <IonLabel>
                      <h2>Account Balance</h2>
                    </IonLabel>
                  </IonListHeader>
                  <IonItem className={"ion-no-padding"}>
                    <div className={"chart-div ion-padding-vertical"}>
                      <Line
                        data={{
                          labels: data.map(val => val.date),
                          datasets: [
                            {
                              fill: false,
                              lineTension: 0.1,
                              backgroundColor: '#008752',
                              borderColor: '#008752',
                              borderCapStyle: 'butt',
                              pointBorderColor: '#008752',
                              pointBackgroundColor: '#008752',
                              pointBorderWidth: 1,
                              pointHoverRadius: 6,
                              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                              pointHoverBorderColor: 'rgba(220,220,220,1)',
                              pointHoverBorderWidth: 2,
                              pointRadius: 4,
                              pointHitRadius: 10,
                              data: data.map(val => val.balance)
                            }
                          ],

                        }}
                        options={{
                          legend: {
                            display: false,
                          },
                          tooltips: {
                            callbacks: {
                              label: function (tooltipItem: any, data: any) {
                                var value = data.datasets[0].data[tooltipItem.index];
                                if (parseInt(value) >= 1000) {
                                  return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                } else {
                                  return '$' + value;
                                }
                              } 
                            }
                          },
                          layout: {
                            padding: {
                              left: 0,
                              right: 5,
                              top: 0,
                              bottom: 0
                            }
                          },
                          scales: {
                            yAxes: [{
                              ticks: {
                                min: 10000, stepSize: 5000,
                                callback: function (value: any, index: any, values: any) {
                                  return '$' + value;
                                }
                              }
                            }],
                            xAxes: [{
                              type: 'time',
                              time: {
                                unit: 'month',
                                stepSize: 3
                              }
                            }]
                          }
                        }}
                      />
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
} export default withIonLifeCycle(AccountOverview);

const data = [
  {
    balance: 18510.15,
    date: '10/12/2018'
  },
  {
    balance: 18210.15,
    date: '11/12/2018'
  },
  {
    balance: 17910.15,
    date: '12/12/2018'
  },
  {
    balance: 17610.15,
    date: '01/12/2019'
  },
  {
    balance: 17310.15,
    date: '02/12/2019'
  },
  {
    balance: 16810.15,
    date: '03/12/2019'
  },
  {
    balance: 16310.15,
    date: '04/12/2019'
  },
  {
    balance: 15810.15,
    date: '05/12/2019'
  },
  {
    balance: 15310.15,
    date: '06/12/2019'
  },
  {
    balance: 14810.15,
    date: '07/12/2019'
  },
  {
    balance: 14310.15,
    date: '08/12/2019'
  },
  {
    balance: 13810.15,
    date: '09/12/2019'
  },
  {
    balance: 13310.15,
    date: '10/12/2019'
  },
  {
    balance: 12810.15,
    date: '11/12/2019'
  },
  {
    balance: 12310.15,
    date: '12/12/2019'
  }
]
