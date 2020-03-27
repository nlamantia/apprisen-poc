// eslint-disable-next-line
import { IonCard, IonFabButton, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonThumbnail, withIonLifeCycle, IonSkeletonText } from "@ionic/react";
// eslint-disable-next-line
import { arrowForward } from "ionicons/icons";
import React, { Component } from "react";
// eslint-disable-next-line
import { Link } from "react-router-dom";
// eslint-disable-next-line
import balance from "../../images/balance.svg";
import calendar from "../../images/calendar.svg";
import goal from "../../images/goal.svg";
import money from "../../images/notes.svg";
import { CaseSummary } from "../../models/case/case-summary";
import { dataService } from "../../services/data.service";
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import {getCaseSummary} from "../../feature/case/action";

class _OverviewCard extends Component {


  ionViewWillEnter() {
    console.log('OverviewCard view entered')
    const { getCaseSummary } = this.props as any
    getCaseSummary()
  }

  render() {
    const { caseSummary } = this.props as any
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
                {caseSummary.estimatedBalance ?
                  <p>${caseSummary.estimatedBalance}</p> : <IonSkeletonText animated style={{ width: '60%' }} />
                }
              </IonLabel>
            </IonItem>
            <IonItem lines={"inset"}>
              <IonThumbnail class={"icon"} slot={"end"}>
                <img alt="apprisen-logo" src={calendar} />
              </IonThumbnail>
              <IonLabel>
                <h3>Upcoming Due Date</h3>
                <p>{caseSummary.nextPaymentDueOn ? caseSummary.nextPaymentDueOn.toString().substring(0, 10) : null}</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonThumbnail class={"icon"} slot={"end"}>
                <img alt="apprisen-logo" src={money} />
              </IonThumbnail>
              <IonLabel>
                <h3>Amount Due</h3>
                <p>${caseSummary.currentMonthlyPayment}</p>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCard>
      </>
    );
  }
}

const OverviewCard = connect(
  state => ({
    caseSummary: state.caseSummary
  }),
  dispatch => bindActionCreators({
    getCaseSummary
  }, dispatch)
)(_OverviewCard)



export default withIonLifeCycle(OverviewCard);
