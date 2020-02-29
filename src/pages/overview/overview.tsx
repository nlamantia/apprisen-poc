import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonThumbnail, IonTitle, IonToolbar, withIonLifeCycle, IonToast } from "@ionic/react";
import React, { Component } from "react";
import logo from "../../images/apprisen-logo.png";
import { CaseData } from "../../models/case/case-data";
import LenderList from "./lender-list";
import OverviewCard from "./overview-card";
import { dataService } from "../../services/data.service";
import { authService } from "../../services/auth.service";
import { restService } from "../../services/rest.service";
import { Redirect } from "react-router-dom";
import { restErrorHandler } from "../../services/rest-error-handler";

class Overview extends Component {

  state = {
    authorized: true,
    restError: false,
    caseData: {} as CaseData
  };

  async setCaseSummaryData() {
    dataService.refreshCaseSummaryData();
  }

  async setDebtDetailData() {
    dataService.refreshDebtDetailData();
  }

  async errorSubscriptions() {
    restErrorHandler.getAuthenticationErrorAsObservable().subscribe(err => this.setState({ ...this.state, authorized: false }));
    restErrorHandler.getRestErrorAsObservable().subscribe(err => this.setState({ ...this.state, restError: true }));
  }


  setUnauthorizedState() {
    this.setState({
      ...this.state,
      authorized: false
    });
  }

  ionViewWillEnter() {
    this.errorSubscriptions();
    this.setCaseSummaryData();
    this.setDebtDetailData();
    console.log('called refresh case summary data');
    fetch("https://nestjs-server-poc.herokuapp.com/user")
      .then(response => response.json())
      .then(data =>
        this.setState({
          authorized: true,
          caseData: data
        })

      )
      .catch(err => console.log(err));
  }

  redirectLogin() {
    authService.logout();
    return (
      <Redirect to="/login" />
    );
  }
  render() {
    if (!this.state.authorized) {
      return (
        this.redirectLogin()
      )
    } else {
      return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonThumbnail class="toolbar-logo" slot={"start"}>
                <img alt="apprisen-logo" src={logo} />
              </IonThumbnail>
              <IonTitle>Apprisen</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonGrid>
              <IonRow>
                <IonCol size={"12"} sizeMd={"6"} sizeLg={"3"} offsetLg={"2"}>
                  <OverviewCard caseData={this.state.caseData} />
                </IonCol>
                <IonCol size={"12"} sizeMd={"6"} sizeLg={"5"}>
                  {this.state.caseData.lenders && (
                    <LenderList lenders={this.state.caseData.lenders} />
                  )}
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonToast
              isOpen={this.state.restError}
              onDidDismiss={() => this.setState({ ...this.state, 'restError': false })}
              message="Please try again."
              color="danger"
              duration={4000}
              header="Oops Something went wrong..."
            />
          </IonContent>
        </IonPage>
      );
    }
  }
}

export default withIonLifeCycle(Overview);
