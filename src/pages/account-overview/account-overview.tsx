import { IonBackButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, withIonLifeCycle } from "@ionic/react";
import React, { Component } from "react";
// eslint-disable-next-line
import { Doughnut } from 'react-chartjs-2';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CaseDebt } from "../../models/case/case-debt";
import { CaseSummary } from "../../models/case/case-summary";
import { dataService } from "../../services/data.service";
import Menu from "../menu/menu";


class AccountOverview extends Component {

  unsubscribeSubject = new Subject<void>();

  state = {
    caseSummary: {} as CaseSummary,
    caseDebt: [] as (CaseDebt[]),
  };

  ionViewWillEnter() {
    console.log('ionWillEnter');
    this.subscribeToCaseSummary();
    this.subscribeToCaseDebt();
  }

  subscribeToCaseSummary() {
    dataService.getCaseSummaryAsObservable()
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe(caseSummary => this.setState({ ...this.state, caseSummary: caseSummary }));
  }

  subscribeToCaseDebt() {
    dataService.getDebtDetailAsObservable()
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe(debtDetail => this.setState({ ...this.state, caseDebt: debtDetail.caseDebts }));

  }

  ionViewWillLeave() {
    this.unsubscribeSubject.next();
  }

  render() {
    return (
      <>
        <Menu pageName={'accountOverview'} />
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton defaultHref="/overview" />
              </IonButtons>
              <IonTitle>Account Overview</IonTitle>
              <IonButtons slot="end">
                <IonMenuButton></IonMenuButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent id="accountOverview">
            <IonGrid>
              <IonRow>
                <IonCol size={"12"} sizeMd={"6"}>
                  <IonCard>
                    <IonList class="ion-no-padding">
                      <IonListHeader class={"white ion-text-center ion-padding-end"}>
                        <IonLabel>
                          <h2>Account Details</h2>
                        </IonLabel>
                      </IonListHeader>
                      <IonItem>
                        <IonLabel>
                          <h3>Current Balance</h3>
                        </IonLabel>
                        <IonLabel>
                          <h3 className={"ion-text-right"}>
                            ${this.state.caseSummary.estimatedBalance}
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
                            ${this.state.caseSummary.currentMonthlyPayment}
                          </h3>
                        </IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonLabel>
                          <h3>
                            Total Monthly Deposit
						            </h3>
                        </IonLabel>
                        <IonLabel>
                          <h3 className={"ion-text-right"}>
                            ${this.state.caseSummary.totalMonthlyDeposit}
                          </h3>
                        </IonLabel>
                      </IonItem>
                    </IonList>
                  </IonCard>
                  <IonCard>
                    <IonList class="ion-no-padding">
                      <IonListHeader class={"white ion-text-center ion-padding-end"}>
                        <IonLabel>
                          <h2>Balance Breakdown</h2>
                        </IonLabel>
                      </IonListHeader>
                      {this.state.caseDebt.map(caseDebt => {
                        return (
                          <IonItem>
                            <IonLabel>
                              <h3>{caseDebt.creditorName}</h3>
                            </IonLabel>
                            <div className={"ion-text-right row-text"}>
                              ${caseDebt.currentBalance.toFixed(2)}
                            </div>
                          </IonItem>
                        );
                      })}
                    </IonList>
                  </IonCard>
                  <IonCard>
                    <IonItem className={"ion-no-padding"}>
                      <div className={"chart-div ion-padding-vertical"}>
                        {this.state.caseDebt.length > 0 && (
                          <Doughnut
                            data={{
                              labels: this.state.caseDebt.map(
                                lender => lender.creditorName
                              ),
                              datasets: [
                                {
                                  data: this.state.caseDebt.map(
                                    lender => lender.currentBalance
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
                                position: "top"
                              },

                            }}
                          />
                        )}
                      </div>
                    </IonItem>
                  </IonCard>
                  {/* <IonCard>
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
                </IonCard> */}
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonPage>
      </>
    );
  }
} export default withIonLifeCycle(AccountOverview);

// eslint-disable-next-line
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
