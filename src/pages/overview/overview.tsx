import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonThumbnail, IonTitle, IonToolbar, withIonLifeCycle } from "@ionic/react";
import React, { Component } from "react";
import logo from "../../images/apprisen-logo.png";
import { CaseData } from "../../models/case-data";
import LenderList from "./lender-list";
import OverviewCard from "./overview-card";

class Overview extends Component {
  state = {
    caseData: {} as CaseData
  };

  ionViewWillEnter() {
    fetch("https://nestjs-server-poc.herokuapp.com/user")
      .then(response => response.json())
      .then(data =>
        this.setState({
          caseData: data
        })
      )
      .catch(err => console.log(err));
  }

  render() {
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
        </IonContent>
      </IonPage>
    );
  }
}

export default withIonLifeCycle(Overview);
