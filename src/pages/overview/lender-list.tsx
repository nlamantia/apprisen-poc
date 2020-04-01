import React, {Component} from "react";
// eslint-disable-next-line
import {IonButton, IonCard, IonItem, IonLabel, IonList, IonListHeader} from "@ionic/react";
// eslint-disable-next-line
import {CaseDebt} from "../../models/case/case-debt";
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {getDebts, selectDebt} from "../../feature/debt/action";

class _LenderList extends Component {

    componentDidMount() {
        const { getDebts } = this.props as any
        getDebts()
    }

    render() {
        const { debtDetail, selectDebts } = this.props as any
        return (
            <IonCard class="color">
                <IonList class="ion-no-padding">
                    <IonListHeader class={"white"}>
                        <IonLabel>
                            <h2>Lenders</h2>
                        </IonLabel>
                    </IonListHeader>

                    {debtDetail.caseDebts != null && debtDetail.caseDebts.map((caseDebt: CaseDebt, i: any) => {
                        return (
                            <IonItem key={i}>
                                <IonLabel>
                                    <h3>{caseDebt.creditorName}</h3>
                                    <p>${caseDebt.currentBalance} balance</p>
                                </IonLabel>
                                <Link
                                    to={{
                                        pathname: `/lender-overview`,
                                        state: { lender: caseDebt }
                                    }}
                                >
                                    <IonButton onClick={() => selectDebt(caseDebt.$id)} fill={'clear'} className={'lender-button'}>Info</IonButton>
                                </Link>
                            </IonItem>
                        )
                    })}
                </IonList>
            </IonCard>
        )
    }
}

const LenderList = connect(
    state => ({
        debtDetail: state.debt.debtDetail
    }),
    dispatch => bindActionCreators({
        getDebts,
        selectDebt
    }, dispatch)
)(_LenderList)

export default LenderList
