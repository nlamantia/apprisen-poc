import React from "react";
// eslint-disable-next-line
import {IonButton, IonCard, IonItem, IonLabel, IonProgressBar} from "@ionic/react";
// eslint-disable-next-line
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {getDebts, selectDebt} from "../../feature/debt/action";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {getClientInformation} from "feature/client/action";
import {calculateProgress} from "../../common/utility-functions";
import ExpandableList from "../common/expandable-list";

const _LenderList = (props: any) => {


    const {debts, selectDebt} = props;

    const handleUploadStatementClick = () => {
        InAppBrowser.create("https://clientportal.apprisen.com", '_system', 'location=yes');
    };

    const generateItemForCaseDebt = (caseDebt) => {
        return(
            <IonItem className={'lender-flex'}>
                <IonLabel className="ion-text-wrap">
                    <h3>{caseDebt.creditorName}</h3>
                    <p>${caseDebt.currentBalance}</p>
                </IonLabel>
                <div className={'lender-progress-holder'}>
                    <IonProgressBar value={calculateProgress(caseDebt.originalBalance, caseDebt.currentBalance)}/>
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
        );
    };

    return (
        <IonCard class="color">
            <ExpandableList data={debts} title={'Lenders'} onItemDisplay={generateItemForCaseDebt} />
            <IonItem className={'full-button'}>
                <IonButton className={'full-button'} expand="full" onClick={handleUploadStatementClick}>Upload
                    Statement</IonButton>
            </IonItem>
        </IonCard>
    )
};

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
)(_LenderList);

export default LenderList
