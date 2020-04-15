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
  IonSkeletonText, IonText,
  IonThumbnail
} from "@ionic/react";
// eslint-disable-next-line
import {arrowForward} from "ionicons/icons";
import React, {Component} from "react";
// eslint-disable-next-line
import {Link} from "react-router-dom";
// eslint-disable-next-line
import calendar from "../../images/calendar.svg";
import goal from "../../images/goal.svg";
import money from "../../images/notes.svg";
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {getCaseSummary} from "../../feature/case/action";

import '@ionic/react/css/core.css';

class _OverviewCard extends Component {


  componentDidMount() {
    console.log('OverviewCard view entered')
    const { getCaseSummary, credentials } = this.props as any
  }


  render() {
    const props = this.props as any
    const { caseSummary: { estimatedBalance, nextPaymentDueOn, currentMonthlyPayment } } =
        (props.caseSummary && props.caseSummary != {}) ? props :
            { caseSummary: { estimatedBalance: null, nextPaymentDueOn: null, currentMonthlyPayment: null } }

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
                  <IonIcon className={"arrow-color"} icon={arrowForward} />
                </IonFabButton>
              </Link>
            </IonListHeader>
            <IonItem>
              <IonThumbnail class={"icon"} slot={"end"}>
                <img alt="apprisen-logo" src={goal} />
              </IonThumbnail>
              <IonLabel>
                <h3>Remaining Balance</h3>
                {estimatedBalance ?
                  <p>${estimatedBalance}</p> : <IonSkeletonText animated style={{ width: '60%' }} />
                }
              </IonLabel>
            </IonItem>
            <IonItem lines={"inset"}>
              <IonThumbnail class={"icon"} slot={"end"}>
                <img alt="apprisen-logo" src={calendar} />
              </IonThumbnail>
              <IonLabel>
                <h3>Upcoming Due Date</h3>
                <p>{nextPaymentDueOn ? nextPaymentDueOn.toString().substring(0, 10) : null}</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonThumbnail class={"icon"} slot={"end"}>
                <img alt="apprisen-logo" src={money} />
              </IonThumbnail>
              <IonLabel>
                <h3>Amount Due</h3>
                <p>${currentMonthlyPayment}</p>
              </IonLabel>
            </IonItem>
            <IonItem>
                <IonButton class={'full-button'}>
                  <b>Make a Payment</b>
                </IonButton>
            </IonItem>
          </IonList>
        </IonCard>
      </>
    );
  }
}

const OverviewCard = connect(
  state => ({
    caseSummary: state.case.caseSummary,
    caseState: state.case,
    credentials: state.auth.credentials
  }),
  dispatch => bindActionCreators({
    getCaseSummary
  }, dispatch)
)(_OverviewCard)

export default OverviewCard
