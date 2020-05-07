import React, {Component, useEffect, useState} from "react";
// eslint-disable-next-line
import {
    IonButton,
    IonCard,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonToast,
    IonAlert,
    IonProgressBar, IonRow, IonCol, IonGrid
} from "@ionic/react";
// eslint-disable-next-line
import {CaseDebt} from "../../models/case/case-debt";
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {getDebts, selectDebt} from "../../feature/debt/action";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {getClientInformation} from "feature/client/action";

const _LenderList = (props: any) => {


    const {debts, selectDebt} = props;

    const handleUploadStatementClick = () => {
        InAppBrowser.create("https://clientportal.apprisen.com", '_system', 'location=yes');
    }

    console.log(debts)
    return (
        <IonCard class="color">
            <IonList class="ion-no-padding">
                <IonListHeader class={"white"}>
                    <IonLabel>
                        <h2>Lenders</h2>
                    </IonLabel>
                </IonListHeader>

                {debts && debts.length > 0
                    ? debts.map((caseDebt: CaseDebt, i: any) => {
                        return (
                            <IonItem className={'lender-flex'} key={i}>
                                <IonLabel className="ion-text-wrap">
                                    <h3>{caseDebt.creditorName}</h3>
                                    <p>${caseDebt.currentBalance}</p>
                                </IonLabel>
                                <div className={'lender-progress-holder'}>
                                    <IonProgressBar value={0.5}/>
                                </div>
                                <Link
                                    to={{
                                        pathname: `/lender-overview`,
                                        state: {lender: caseDebt}
                                    }}
                                    onClick={() => selectDebt(caseDebt.$id)}
                                >
                                    <IonButton onClick={() => selectDebt(caseDebt.$id)} fill={'clear'}
                                               className={'lender-button'}>Info</IonButton>
                                </Link>
                            </IonItem>
                        )
                    })
                    : <IonItem>
                        <IonLabel>
                            <h3 className={'full-center'}>No debts found</h3>
                        </IonLabel>
                    </IonItem>}
            </IonList>
            <IonItem className={'full-button'}>
                <IonButton className={'full-button'} expand="full" onClick={handleUploadStatementClick}>Upload
                    Statement</IonButton>
            </IonItem>
        </IonCard>
    )
}

const LenderList = connect(
    state => ({
        debts: state.debt.debts,
        clientInformation: state.client.clientInformation,
        fetchingClientInformation: state.client.fetchingClientInformation
    }),
    dispatch => bindActionCreators({
        getDebts,
        selectDebt,
        getClientInformation
    }, dispatch)
)(_LenderList)

export default LenderList
