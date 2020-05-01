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
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {connect} from 'react-redux'
import React, {useEffect, useState} from "react";
// eslint-disable-next-line
import {Doughnut} from 'react-chartjs-2';
import {getCaseSummary} from "../../feature/case/action";
import {getDebts} from "../../feature/debt/action";
import {bindActionCreators} from "redux";
import {getCredentials, logout} from "../../feature/auth/action";
import {Redirect} from "react-router";
import {CaseDebt} from "../../models/case/case-debt";
import {CaseSummary} from "../../models/case/case-summary";
import SocialMediaFooter from "../common/social-media-footer";


const _AccountOverview = ( props ) => {
    const { caseSummary, debts } = props
    const { credentials, getCredentials, logout } = props;

    const [userDebts, setUserDebts] = useState<CaseDebt[]>([]);
    const [userCaseSummary, setUserCaseSummary] = useState<CaseSummary>({} as CaseSummary);

  function redirectLogin() {
    logout();
    return (
        <Redirect to="/login"/>
    );
  }

    useEffect(
        () => {
          if (credentials && credentials.linkedApplication) {
            const {getCaseSummary, getDebts} = props
            if (!caseSummary || caseSummary === {}) {
              getCaseSummary();
            } else {
              setUserCaseSummary(caseSummary);
            }

            if (!debts || debts === {}) {
              getDebts();
            } else {
              setUserDebts(debts)
            }
          } else {
            try {
              getCredentials();
            } catch (e) {
              redirectLogin();
            }
          }
        }, [credentials, caseSummary, debts]);

    return (
      <>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton defaultHref="/overview" />
              </IonButtons>
              <IonTitle>Account Overview</IonTitle>
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
                            ${userCaseSummary && userCaseSummary.estimatedBalance ? userCaseSummary.estimatedBalance : 0}
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
                            ${userCaseSummary && userCaseSummary.currentMonthlyPayment ? userCaseSummary.currentMonthlyPayment : 0}
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
                            ${userCaseSummary && userCaseSummary.totalMonthlyDeposit ? userCaseSummary.totalMonthlyDeposit : 0}
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
                      {userDebts.map(debt => {
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
                        {userDebts.length > 0 && (
                          <Doughnut
                            data={{
                              labels: userDebts.map(
                                lender => lender.creditorName
                              ),
                              datasets: [
                                {
                                  data: userDebts.map(
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
          <SocialMediaFooter/>
        </IonPage>
      </>
    )
}



const AccountOverview = connect(
    state => ({
      caseSummary: state.case.caseSummary,
      debts: state.debt.debts,
      credentials: state.auth.credentials
    }),
    dispatch => bindActionCreators({
      getCaseSummary,
      getDebts,
      getCredentials,
      logout
    }, dispatch)
)(
    _AccountOverview
);

export default AccountOverview