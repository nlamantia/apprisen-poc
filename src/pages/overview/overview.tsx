import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonThumbnail,
  IonTitle,
  IonToast,
  IonToolbar
} from "@ionic/react";
import React, {useEffect, useState} from "react";
import {Redirect, useLocation} from "react-router-dom";
import logo from "../../images/apprisen-logo.png";
import authService from "../../services/auth.service";
import Menu from "../menu/menu";
import LenderList from "./lender-list";
import OverviewCard from "./overview-card";
import {connect} from 'react-redux'
import {getCaseSummary} from "../../feature/case/action";
import {getDebts} from "../../feature/debt/action";
import {bindActionCreators} from "redux";
import { logout } from '../../feature/auth/action'


const _Overview = (props) => {

  const { getDebts, getCaseSummary, logout } = props

  const { caseSummary, debts } = props

  const location = useLocation();
  const [authorized, setAuthorized] = useState<boolean>(true);
  const [restError, setRestError] = useState<boolean>(false);


  useEffect(
    () => {
      getCaseSummary();
      // todo having getDebts() and getCaseSummary() fire at the same time makes them not work. SetTimeoute mitigates this. find better solution
      setTimeout(getDebts, 2000)
    }, []);


  function redirectLogin() {
    logout()
    return (
      <Redirect to="/login" />
    );
  }

  return (
    !authorized ? redirectLogin() :
      <>
        {/*<Menu pageName={'pageName'} /> todo fix this*/}
        <Menu />
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

// The connect function implements the HOC pattern, passing state to its children
// https://reactjs.org/docs/higher-order-components.html
const Overview = connect(
   state => ({
      caseSummary: state.case.caseSummary,
      debts: state.debts
   }),
   dispatch => bindActionCreators({
      getCaseSummary,
      getDebts,
      logout
   }, dispatch)
)(
   _Overview
);

export default Overview
