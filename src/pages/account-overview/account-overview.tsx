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
    IonToolbar,
    IonFooter
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
import {getPaymentHistory} from "../../feature/payment/action";
import {CaseDeposit} from "../../models/payment/case-deposit";
import {printDate} from "../common/utility-functions";
import {BRAND_COLORS} from "../../common/app-constants";

export const getLenderListForGraph = (lenders: CaseDebt[], colors: string[]): CaseDebt[] => {
    let sortedLenders = lenders.sort((l1, l2) => l2.currentBalance - l1.currentBalance);
    if (sortedLenders.length <= colors.length) {
        return lenders;
    }

    let graphLenders = [];
    for (let i = 0; i < colors.length - 1; i++) {
        graphLenders.push(sortedLenders[i])
    }

    let sumOriginalBalance = 0, sumCurrentBalance = 0;
    for (let i = colors.length - 1; i < sortedLenders.length; i++) {
        sumOriginalBalance += sortedLenders[i].originalBalance;
        sumCurrentBalance += sortedLenders[i].currentBalance;
    }

    graphLenders.push({
        accountNumber: "-",
        apr: 0,
        creditorName: "Other",
        currentBalance: sumCurrentBalance,
        debtId: "-111",
        debtType: 1,
        lastCreditorPaymentDate: new Date(),
        originalBalance: sumOriginalBalance,
        $id: "-1"
    } as CaseDebt);

    return graphLenders;
};

const _AccountOverview = (props) => {
    const {caseSummary, debts} = props;
    const {credentials, getCredentials, logout} = props;
    const {paymentHistory} = props;

    const [userDebts, setUserDebts] = useState<CaseDebt[]>([]);
    const [graphDebts, setGraphDebts] = useState<CaseDebt[]>([]);
    const [userCaseSummary, setUserCaseSummary] = useState<CaseSummary>({} as CaseSummary);
    const [userPaymentHistory, setUserPaymentHistory] = useState<CaseDeposit[]>([]);

    function redirectLogin() {
        logout();
        return (
            <Redirect to="/login"/>
        );
    }

    useEffect(
        () => {
            if (credentials && credentials.linkedApplication) {
                const {getCaseSummary, getDebts, getPaymentHistory} = props;
                if (!caseSummary || caseSummary === {}) {
                    getCaseSummary();
                } else {
                    setUserCaseSummary(caseSummary);
                }

                if (!debts || debts === {}) {
                    getDebts();
                } else {
                    setUserDebts(debts);
                    // FOR DEMO ONLY - REMOVE WHEN DONE
                    // let debtsForGraph = [];
                    // for (let i = 0; i < 6; i++) {
                    //     for (let j = 0; j < debts.length; j++) {
                    //         debtsForGraph.push(debts[j]);
                    //     }
                    // }
                    // setGraphDebts(getLenderListForGraph(debtsForGraph, BRAND_COLORS));
                    setGraphDebts(getLenderListForGraph(debts, BRAND_COLORS));
                }

                if (!paymentHistory || !paymentHistory.length || paymentHistory.length === 0) {
                    getPaymentHistory();
                } else {
                    setUserPaymentHistory(paymentHistory);
                }
            } else {
                try {
                    getCredentials();
                } catch (e) {
                    redirectLogin();
                }
            }
        }, [credentials, caseSummary, debts, paymentHistory]);

    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/overview"/>
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
                                        {/* <IonItem>
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
                                        </IonItem> */}
                                    </IonList>
                                </IonCard>
                                <IonCard>
                                    <IonList class="ion-no-padding">
                                        <IonListHeader class={"white ion-text-center ion-padding-end"}>
                                            <IonLabel>
                                                <h2>Payment History</h2>
                                            </IonLabel>
                                        </IonListHeader>
                                        {userPaymentHistory && userPaymentHistory.length > 0 ?
                                            userPaymentHistory.map(caseDeposit => {
                                                return (
                                                    <IonItem>
                                                        <IonLabel>
                                                            <h3>{printDate(new Date(caseDeposit.postedDate))}</h3>
                                                        </IonLabel>
                                                        <div className={"ion-text-right row-text"}>
                                                            ${caseDeposit.amount.toFixed(2)}
                                                        </div>
                                                    </IonItem>
                                                );
                                            })
                                            :
                                            <IonItem>
                                                <IonLabel>
                                                    <h3 className={'full-center'}>No payments found</h3>
                                                </IonLabel>
                                            </IonItem>
                                        }
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
                                            {graphDebts.length > 0 && (
                                                <Doughnut
                                                    data={{
                                                        labels: graphDebts.map(
                                                            lender => lender.creditorName
                                                        ),
                                                        datasets: [
                                                            {
                                                                data: graphDebts.map(
                                                                    lender => lender.currentBalance
                                                                ),
                                                                backgroundColor: BRAND_COLORS,
                                                                hoverBackgroundColor: BRAND_COLORS
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
                    <IonFooter className="ion-no-border"/>
                </IonContent>
            </IonPage>
        </>
    )
}

const AccountOverview = connect(
    state => ({
        caseSummary: state.case.caseSummary,
        debts: state.debt.debts,
        credentials: state.auth.credentials,
        paymentHistory: state.payment.paymentHistory
    }),
    dispatch => bindActionCreators({
        getCaseSummary,
        getDebts,
        getCredentials,
        getPaymentHistory,
        logout
    }, dispatch)
)(
    _AccountOverview
);

export default AccountOverview