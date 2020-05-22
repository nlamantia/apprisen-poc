// eslint-disable-next-line
import {
    IonButton,
    IonCard,
    IonFabButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonSkeletonText,
    IonThumbnail
} from "@ionic/react";
// eslint-disable-next-line
import {arrowForward} from "ionicons/icons";
import React, {useEffect} from "react";
// eslint-disable-next-line
import {Link} from "react-router-dom";
// eslint-disable-next-line
import calendar from "../../images/calendar.svg";
import goal from "../../images/goal.svg";
import money from "../../images/notes.svg";
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {getCasePayoffDate, getCaseSummary} from "../../feature/case/action";

import '@ionic/react/css/core.css';
import {printDate} from "../common/utility-functions";

const _OverviewCard = (props) => {

    const { getCaseSummary, fetchingCaseSummary, caseSummary } = props
    const { getCasePayoffDate, fetchingCasePayoffDate} = props
    const { casePayoffDate } = props
    

    useEffect(
        () => {
            if (!caseSummary && !fetchingCaseSummary) {
                console.log('get case summary')
                getCaseSummary();
            }
            if (!casePayoffDate && !fetchingCasePayoffDate) {
                console.log('get case payoff debt!')
                // todo mock this
                // todo decide between caseNumber and externalId
                // todo caseNumber selector
                getCasePayoffDate({ caseNumber: 5, increaseAmount: 0, isOneTimePayment: true })
            }
        }, []
    );

        const {caseSummary: {estimatedBalance, nextPaymentDueOn, currentMonthlyPayment}} =
            (props.caseSummary && props.caseSummary != {}) ? props :
                {caseSummary: {estimatedBalance: null, nextPaymentDueOn: null, currentMonthlyPayment: null}}

        return (
            <>
                <IonCard class="color">
                    <IonList class="ion-no-padding">
                        <IonListHeader class={"white"}>
                            <IonLabel>
                                <h2>Account Overview</h2>
                            </IonLabel>
                            <Link
                                to={{
                                    pathname: `/account-overview`
                                }}
                            >
                                <IonFabButton class={"fab-button"} color={"light"}>
                                    <IonIcon className={"arrow-color"} icon={arrowForward}/>
                                </IonFabButton>
                            </Link>
                        </IonListHeader>
                        <IonItem>
                            <IonThumbnail class={"icon"} slot={"end"}>
                                <img alt="apprisen-logo" src={goal}/>
                            </IonThumbnail>
                            <IonLabel>
                                <h3>Estimated Payoff Date</h3>
                                {casePayoffDate ?
                                    <p>{printDate(new Date(casePayoffDate))}</p> : <IonSkeletonText animated style={{width: '60%'}}/>
                                }
                            </IonLabel>
                        </IonItem>
                        <IonItem lines={"inset"}>
                            <IonThumbnail class={"icon"} slot={"end"}>
                                <img alt="apprisen-logo" src={calendar}/>
                            </IonThumbnail>
                            <IonLabel>
                                <h3>Upcoming Due Date</h3>
                                <p>
                                    {nextPaymentDueOn
                                        ? printDate(new Date(nextPaymentDueOn))
                                        : <IonSkeletonText animated style={{width: '60%'}}/>}
                                </p>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonThumbnail class={"icon"} slot={"end"}>
                                <img alt="apprisen-logo" src={money}/>
                            </IonThumbnail>
                            <IonLabel>
                                <h3>Amount Due</h3>
                                <p>
                                    {currentMonthlyPayment
                                        ? "$" + currentMonthlyPayment
                                        : <IonSkeletonText animated style={{width: '60%'}}/>}
                                </p>
                            </IonLabel>
                        </IonItem>
                        <IonItem className={'full-button'}>
                            <Link to={{
                                pathname: `/make-payment`
                            }} style={{width: 100 + "%"}}>
                            <IonButton className={'full-button'} expand="full">
                                Make Payment
                            </IonButton>
                            </Link>
                        </IonItem>
                    </IonList>
                </IonCard>
            </>
        );
    }


const OverviewCard = connect(
    state => ({
        caseSummary: state.case.caseSummary,
        caseState: state.case,
        credentials: state.auth.credentials,
        casePayoffDate: state.case.casePayoffDate,
        fetchingCasePayoffDate: state.case.fetchingCasePayoffDate,
        fetchingCaseSummary: state.case.fetchingCaseSummary
    }),
    dispatch => bindActionCreators({
        getCaseSummary,
        getCasePayoffDate
    }, dispatch)
)(_OverviewCard)

export default OverviewCard
