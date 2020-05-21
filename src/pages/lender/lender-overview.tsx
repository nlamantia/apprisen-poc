import {
    IonBackButton,
    IonButtons,
    IonCard, IonCol,
    IonContent, IonGrid,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage, IonRow,
    IonSkeletonText,
    IonTitle,
    IonToolbar,
    IonFooter
} from "@ionic/react";
import React, {useEffect, useState} from "react";
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {getDebts, getSelectedDebt} from "../../feature/debt/action";
import {getCredentials, logout} from "../../feature/auth/action";
import {CaseDebt} from "../../models/case/case-debt";
import ProgressTrackerCard from "../common/progress-tracker-card";
import {calculateProgress} from "../common/utility-functions";

const _LenderOverview = (props) => {
    const {debts, selectedDebtId} = props;

    const { credentials, getCredentials, logout } = props;
    const { getDebts, getSelectedDebt } = props;

    const [lender, setLender] = useState<CaseDebt>(null);
    const [progress, setProgress] = useState<number>(0.00);

    useEffect(() => {
        if (credentials) {
            console.log("found credentials");
            if (!lender) {
                if (debts && selectedDebtId) {
                    console.log('found selected debt ID');
                    let filteredDebts = debts.filter(debt => debt.$id === selectedDebtId);
                    if (filteredDebts && filteredDebts.length > 0) {
                        const lender = filteredDebts[0];
                        setLender(lender);
                        setProgress(calculateProgress(lender.originalBalance, lender.currentBalance));
                    }
                } else {
                    console.log('some information is missing');
                    getDebts();
                    getSelectedDebt();
                }
            }
        } else {
            console.log("no credentials found")
            try {
                getCredentials();
            } catch (e) {
                console.log(JSON.stringify(e));
                logout();
            }
        }
    }, [credentials, debts, selectedDebtId]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/overview"/>
                    </IonButtons>
                    <IonTitle>{lender ? lender.creditorName : ""}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size={"12"} sizeMd={"8"} sizeLg={"8"} offsetLg={"2"}>
                            <ProgressTrackerCard 
                                currentLabel={"N/A"}
                                startLabel={((lender && lender.originalBalance) ? "$" + lender.originalBalance.toFixed(2) : undefined)}
                                endLabel={((lender && lender.currentBalance) ? "$" + lender.currentBalance.toFixed(2) : undefined)}
                                currentProgress={progress}/>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size={"12"} sizeMd={"8"} sizeLg={"8"} offsetLg={"2"}>
                            <IonCard>
                                <IonList class="ion-no-padding">
                                    <IonListHeader class={"white ion-text-center ion-padding-end"}>
                                        <IonLabel>
                                            <h2>Lender Details</h2>
                                        </IonLabel>
                                    </IonListHeader>
                                    <IonItem>
                                        <IonLabel>
                                            <h3>Account Number</h3>
                                        </IonLabel>
                                        <IonLabel>
                                            <div className={'flex-grid'}>
                                                <div className={'single-card-grid'} />
                                                <div className={'single-card-grid'}>
                                                    <h3 className={"ion-text-right"}>
                                                        {lender ? lender.accountNumber : <IonSkeletonText animated style={{width: '100%'}} />}
                                                    </h3>
                                                </div>
                                            </div>
                                        </IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel>
                                            <h3>Remaining Balance</h3>
                                        </IonLabel>
                                        <IonLabel>
                                            <div className={'flex-grid'}>
                                                <div className={'single-card-grid'} />
                                                <div className={'single-card-grid'}>
                                                    <h3 className={"ion-text-right"}>
                                                        {lender ? "$" + lender.currentBalance : <IonSkeletonText animated style={{width: '100%'}} />}
                                                    </h3>
                                                </div>
                                            </div>
                                        </IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel>
                                            <h3>Starting Balance</h3>
                                        </IonLabel>
                                        <IonLabel>
                                            <div className={'flex-grid'}>
                                                <div className={'single-card-grid'} />
                                                <div className={'single-card-grid'}>
                                                    <h3 className={"ion-text-right"}>
                                                        {lender && lender.originalBalance ? "$" + lender.originalBalance.toFixed(2) :
                                                            <IonSkeletonText animated style={{width: '100%'}}/>}
                                                    </h3>
                                                </div>
                                            </div>
                                        </IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel>
                                            <h3>APR</h3>
                                        </IonLabel>
                                        <IonLabel>
                                            <div className={'flex-grid'}>
                                                <div className={'single-card-grid'} />
                                                <div className={'single-card-grid'}>
                                                    <h3 className={"ion-text-right"}>
                                                        {lender ? (lender.apr * 100) + "%" : <IonSkeletonText animated style={{width: '100%'}} />}
                                                    </h3>
                                                </div>
                                            </div>
                                        </IonLabel>
                                    </IonItem>
                                    <IonItem>
                                        <IonLabel>
                                            <h3>Debt Type</h3>
                                        </IonLabel>
                                        <IonLabel>
                                            <div className={'flex-grid'}>
                                                <div className={'single-card-grid'} />
                                                <div className={'single-card-grid'}>
                                                    <h3 className={"ion-text-right"}>
                                                        {lender ? lender.debtType : <IonSkeletonText animated style={{width: '100%'}} />}
                                                    </h3>
                                                </div>
                                            </div>
                                        </IonLabel>
                                    </IonItem>
                                </IonList>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonFooter className="ion-no-border"/>
            </IonContent>
        </IonPage>
    )
};

const LenderOverview = connect(
    state => ({
        // todo implement as selector?
        // todo error checking
        debts: state.debt.debts,
        selectedDebtId: state.debt.selectedDebtId,
        credentials: state.auth.credentials
    }),
    dispatch => bindActionCreators({
        getSelectedDebt,
        getDebts,
        getCredentials,
        logout
    }, dispatch)
)(
    _LenderOverview
);

export default LenderOverview
