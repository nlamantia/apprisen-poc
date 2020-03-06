import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonThumbnail, IonTitle, IonToast, IonToolbar, IonButtons, IonMenuButton } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import logo from "../../images/apprisen-logo.png";
import authService from "../../services/auth.service";
import { dataService } from "../../services/data.service";
import { restErrorHandler } from "../../services/rest-error-handler";
import Menu from "../menu/menu";
import LenderList from "./lender-list";
import OverviewCard from "./overview-card";
import { menuController } from "@ionic/core";

const Overview = () => {

  const location = useLocation();
  const [authorized, setAuthorized] = useState<boolean>(true);
  const [restError, setRestError] = useState<boolean>(false);

  useEffect(
    () => {
      console.log('useEffect called')
      setCaseSummaryData();
      setDebtDetailData();
    }, []);

  useEffect(() => { errorSubscriptions() }, [])

  async function setCaseSummaryData() {
    dataService.refreshCaseSummaryData();
  }

  async function setDebtDetailData() {
    dataService.refreshDebtDetailData();
  }

  async function errorSubscriptions() {
    restErrorHandler.getAuthenticationErrorAsObservable().subscribe(err => setAuthorized(false));
    restErrorHandler.getRestErrorAsObservable().subscribe(err => setRestError(true));
  }

  function redirectLogin() {
    authService.logout();
    return (
      <Redirect to="/login" />
    );
  }

  return (
    !authorized ? redirectLogin() :
      <>
        <Menu pageName={'pageName'} />
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonThumbnail class="toolbar-logo" slot={"start"}>
                <img alt="apprisen-logo" src={logo} />
              </IonThumbnail>
              <IonTitle>Apprisen</IonTitle>
              <IonButtons slot="end">
                <IonMenuButton></IonMenuButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent id="pageName">
            <IonGrid>
              <IonRow>
                <IonCol size={"12"} sizeMd={"6"} sizeLg={"3"} offsetLg={"2"}>
                  <OverviewCard />
                </IonCol>
                <IonCol size={"12"} sizeMd={"6"} sizeLg={"5"}>
                  <LenderList />
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

export default Overview;
