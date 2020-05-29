import {
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonRow,
    IonThumbnail,
    IonTitle,
    IonToast,
    IonToolbar,
    IonFooter, IonSkeletonText
} from "@ionic/react";
import React, {useEffect, useState} from "react";
import {Redirect, useLocation} from "react-router-dom";
import logo from "../../images/apprisen-logo.png";
import LenderList from "./lender-list";
import OverviewCard from "./overview-card";
import {connect} from 'react-redux'
import {getCaseSummary} from "../../feature/case/action";
import {getDebts} from "../../feature/debt/action";
import {bindActionCreators} from "redux";
import {getCredentials, logout} from '../../feature/auth/action'
import {getClientAccountData, getPaymentHistory} from "../../feature/payment/action";
import ProgressTrackerCard from "../common/progress-tracker-card";
import WelcomeBanner from "pages/common/welcome-banner";

const _Overview = (props) => {

    const { logout } = props
    const {getDebts, fetchingDebtDetails, debts} = props
    const { getCaseSummary, fetchingCaseSummary, caseSummary } = props
    const { getClientAccountData, clientAccountData } = props;
    const { credentials, getCredentials } = props;
    const { paymentHistory, getPaymentHistory } = props;

    const location = useLocation();
    const [authorized, setAuthorized] = useState<boolean>(true);
    const [restError, setRestError] = useState<boolean>(false);
    const [totalOriginalBalance, setTotalOriginalBalance] = useState<number>();
    const [currentBalance, setCurrentBalance] = useState<number>();
    const [monthlyPayment, setMonthlyPayment] = useState<number>();
    const [caseProgress, setCaseProgress] = useState<number>(0);

    function redirectLogin() {
        logout()
        return (
            <Redirect to="/login"/>
        );
    }

    const calculateCurrentProgress = () => {
        if (totalOriginalBalance > 0) {
            return (totalOriginalBalance - currentBalance) / totalOriginalBalance;
        } else {
            return 0;
        }
    };

    useEffect(
        () => {
            if (credentials && credentials.linkedApplication) {
                if (!clientAccountData || !clientAccountData.dmpCaseId || !clientAccountData.bankAccountTypes) {
                    console.log('get client data');
                    getClientAccountData();
                } else {
                    const { dmpCaseId: caseId } = clientAccountData;
                    if (!paymentHistory || !paymentHistory.length) {
                        console.log('get payment history');
                        getPaymentHistory();
                    }

                    if (!caseSummary && !fetchingCaseSummary) {
                        console.log('get case summary for case ID: ' + caseId)
                        getCaseSummary(caseId);
                    } else if (caseSummary) {
                        setCurrentBalance(caseSummary.estimatedBalance.toFixed(2));
                        setMonthlyPayment(caseSummary.currentMonthlyPayment.toFixed(2));
                        setCaseProgress(calculateCurrentProgress());
                    }

                    if (!debts && !fetchingDebtDetails) {
                        console.log('get case summary')
                        getDebts();
                    } else if (debts) {
                        setTotalOriginalBalance(debts.reduce((current, nextDebt) => (current + nextDebt.originalBalance), 0.00).toFixed(2));
                    }
                }
            } else {
                try {
                    getCredentials();
                } catch (e) {
                    redirectLogin();
                }
            }
        }, [credentials, debts, clientAccountData, caseSummary, totalOriginalBalance, paymentHistory]);

    return (
        !authorized ? redirectLogin() :
            <>
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonThumbnail class="toolbar-logo" slot={"start"}>
                                <img alt="apprisen-logo" src={logo}/>
                            </IonThumbnail>
                            <IonTitle>Apprisen</IonTitle>
                            <IonButtons slot="end">
                                <IonMenuButton></IonMenuButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent id="overview">
                        <IonGrid className={'lender-grid'}>
                             <IonRow>
                                <IonCol size={"12"} sizeMd={"8"} sizeLg={"8"} offsetLg={"2"}>
                                    <WelcomeBanner/>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol size={"12"} sizeMd={"8"} sizeLg={"8"} offsetLg={"2"}>
                                    <ProgressTrackerCard
                                        currentLabel={monthlyPayment ? "$" + monthlyPayment : undefined}
                                        startLabel={totalOriginalBalance ? "$" + totalOriginalBalance : undefined}
                                        endLabel={currentBalance ? "$" + currentBalance : undefined}
                                        currentProgress={caseProgress}/>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol size={"12"} sizeMd={"6"} sizeLg={"3"} offsetLg={"2"}>
                                    <OverviewCard/>
                                </IonCol>
                                <IonCol size={"12"} sizeMd={"6"} sizeLg={"5"}>
                                    <LenderList/>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        <IonToast
                            isOpen={restError}
                            onDidDismiss={() => setRestError(false)}
                            message="Please try again."
                            color="danger"
                            duration={4000}
                            header="Oops Something went wrong..."
                        />
                        <IonFooter className="ion-no-border"/>
                    </IonContent>
                </IonPage>
            </>
    )
}

// The connect function implements the HOC pattern, passing state to its children
// https://reactjs.org/docs/higher-order-components.html
const Overview = connect(
    state => ({
        caseSummary: state.case.caseSummary,
        fetchingCaseSummary: state.case.fetchingCaseSummary,
        fetchingDebtDetails: state.debt.fetchingDebtDetail,
        fetchingCasePayoffDate: state.case.fetchingCasePayoffDate,
        clientAccountData: state.payment.clientAccountData,
        credentials: state.auth.credentials,
        debts: state.debt.debts,
        paymentHistory: state.payment.paymentHistory
    }),
    dispatch => bindActionCreators({
        getCaseSummary,
        getDebts,
        logout,
        getPaymentHistory,
        getClientAccountData,
        getCredentials
    }, dispatch)
)(
    _Overview
);

export default Overview
