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
    IonToolbar
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

const _Overview = (props) => {

    const { logout } = props
    const {getDebts, fetchingDebtDetails, debts} = props
    const { getCaseSummary, fetchingCaseSummary, caseSummary } = props
    const { getClientAccountData, clientAccountData } = props;
    const { credentials, getCredentials } = props;
    const { paymentHistory, getPaymentHistory } = props;
    let externalId = React.useRef();

    const location = useLocation();
    const [authorized, setAuthorized] = useState<boolean>(true);
    const [restError, setRestError] = useState<boolean>(false);
    const [totalOriginalBalance, setTotalOriginalBalance] = useState<number>(0.00);
    const [currentBalance, setCurrentBalance] = useState<number>(0.00);
    const [monthlyPayment, setMonthlyPayment] = useState<number>(0.00);
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
                const [, second] = credentials.linkedApplication;
                externalId.current = second.externalId;

                if (!paymentHistory || !paymentHistory.length) {
                    console.log('get payment history');
                    getPaymentHistory();
                }

                if (!caseSummary && !fetchingCaseSummary) {
                    console.log('get case summary')
                    getCaseSummary();
                } else if (caseSummary) {
                    setCurrentBalance(caseSummary.estimatedBalance);
                    setMonthlyPayment(caseSummary.currentMonthlyPayment);
                    setCaseProgress(calculateCurrentProgress());

                    if (paymentHistory) {
                        const sum = (current, nextPayment) => (current + nextPayment.amount);
                        const totalPaid = paymentHistory.reduce(sum, 0.00);
                        setTotalOriginalBalance(caseSummary.estimatedBalance + totalPaid);
                    }
                }

                if (!debts && !fetchingDebtDetails) {
                    console.log('get case summary')
                    getDebts();
                }

                if (!clientAccountData || !clientAccountData.bankAccountTypes) {
                    console.log('get client data');
                    getClientAccountData();
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
                        <IonGrid>
                            <IonRow>
                                <IonCol size={"12"} sizeMd={"8"} sizeLg={"8"} offsetLg={"2"}>
                                    <ProgressTrackerCard currentLabel={"$" + monthlyPayment} startLabel={"$" + totalOriginalBalance} endLabel={"$" + currentBalance} currentProgress={caseProgress}/>
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
