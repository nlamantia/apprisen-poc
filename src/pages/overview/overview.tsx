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
import ProgressTracker from "../common/progress-tracker";
import LenderList from "./lender-list";
import OverviewCard from "./overview-card";
import {connect} from 'react-redux'
import {getCasePayoffDate, getCaseSummary} from "../../feature/case/action";
import {getDebts} from "../../feature/debt/action";
import {bindActionCreators} from "redux";
import {getCredentials, logout} from '../../feature/auth/action'

import {
    caseFirstPaymentDateUnixTimeSelector,
    casePayoffDateSelector,
    caseProgressTracker
} from "../../feature/case/reducer";
import {getClientAccountData} from "../../feature/payment/action";
import SocialMediaFooter from "pages/common/social-media-footer";
import AdditionalResourcesPreview from "pages/additional-resources/additional-resources-preview";

const _Overview = (props) => {

    const { caseProgress, logout } = props
    const {getDebts, fetchingDebtDetails, debts} = props
    const { getCaseSummary, fetchingCaseSummary, caseSummary, caseFirstDisbursementDate } = props
    const { getCasePayoffDate, fetchingCasePayoffDate, casePayoffDate } = props
    const { getClientAccountData, clientAccountData } = props;
    const { credentials, getCredentials } = props;
    let externalId = React.useRef();

    const location = useLocation();
    const [authorized, setAuthorized] = useState<boolean>(true);
    const [restError, setRestError] = useState<boolean>(false);

    function redirectLogin() {
        logout()
        return (
            <Redirect to="/login"/>
        );
    }

    useEffect(
        () => {
            if (credentials && credentials.linkedApplication) {
                const [, second] = credentials.linkedApplication;
                externalId.current = second.externalId;
                if (!caseSummary && !fetchingCaseSummary) {
                    console.log('get case summary')
                    getCaseSummary();
                }
                if (!debts && !fetchingDebtDetails) {
                    console.log('get case summary')
                    getDebts();
                }
                if (!casePayoffDate && !fetchingCasePayoffDate) {
                    console.log('get case payoff debt!')
                    // todo mock this
                    // todo decide between caseNumber and externalId
                    // todo caseNumber selector
                    getCasePayoffDate({caseNumber: externalId, increaseAmount: 0, isOneTimePayment: true})
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


            // todo having getDebts() and getCaseSummary() fire at the same time makes them not work. SetTimeoute mitigates this. find better solution
            // setTimeout(getCaseSummaryDebts, 2000)
        }, [credentials]);

    const printDate = (date) => {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        return month + "/" + day + "/" + year;
    };

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
                                    <ProgressTracker currentLabel={printDate(new Date())} startLabel={printDate(new Date(caseFirstDisbursementDate))} endLabel={printDate(new Date(casePayoffDate))} currentProgress={caseProgress}/>
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
        debts: state.debts,
        caseFirstDisbursementDate: caseFirstPaymentDateUnixTimeSelector(state),
        casePayoffDate: casePayoffDateSelector(state),
        caseProgress: caseProgressTracker(state)
    }),
    dispatch => bindActionCreators({
        getCaseSummary,
        getDebts,
        logout,
        getClientAccountData,
        getCasePayoffDate,
        getCredentials
    }, dispatch)
)(
    _Overview
);

export default Overview
