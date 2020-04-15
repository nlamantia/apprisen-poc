import {
  IonBackButton,
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
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import {connect} from 'react-redux'
import React, {useEffect} from "react";
// eslint-disable-next-line
import {Doughnut} from 'react-chartjs-2';
import Menu from "../menu/menu";
import {getCaseSummary} from "../../feature/case/action";
import {getDebts} from "../../feature/debt/action";
import {bindActionCreators} from "redux";


const _AccountOverview = ( props ) => {
    const { caseSummary, debts } = props
    const { estimatedBalance, currentMonthlyPayment, totalMonthlyDeposit } = caseSummary

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
        {/*<Menu pageName={'accountOverview'} /> todo fix this*/}
        <Menu />
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
                <IonCol size={"12"} sizeMd={"6"} offsetMd={"3"}>
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
                            ${estimatedBalance}
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
                            ${currentMonthlyPayment}
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
                            ${totalMonthlyDeposit}
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
                      {debts.map(debt => {
                        return (
                          <IonItem>
                            <IonLabel>
                              <h3>{debt.creditorName}</h3>
                            </IonLabel>
                            <div className={"ion-text-right row-text"}>
                              ${debt.currentBalance.toFixed(2)}
                            </div>
                          </IonItem>
                        );
                      })}
                    </IonList>
                  </IonCard>
                  <IonCard>
                    <IonItem className={"ion-no-padding"}>
                      <div className={"chart-div ion-padding-vertical"}>
                        {debts.length > 0 && (
                          <Doughnut
                            data={{
                              labels: debts.map(
                                lender => lender.creditorName
                              ),
                              datasets: [
                                {
                                  data: debts.map(
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
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonPage>
      </>
    )
}



const AccountOverview = connect(
    state => ({
      caseSummary: state.case.caseSummary,
      debts: state.debt.debts
    }),
    dispatch => bindActionCreators({
      getCaseSummary,
      getDebts
    }, dispatch)
)(
    _AccountOverview
);

export default AccountOverview

// eslint-disable-next-line
// todo move to json
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
