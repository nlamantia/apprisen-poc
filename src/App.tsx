import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/user/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import UserDetails from "./pages/user/UserDetails";
import Overview from "./pages/overview/overview";
import PaymentOverview from "./pages/payment-overview/payment-overview";
import AccountOverview from "./pages/account-overview/account-overview";
import LenderOverview from "./pages/lender/lender-overview";
import Login from "./pages/login/login"

const App: React.FC = () => (
  <IonApp>
    <IonMenu side="end" menuId="first" contentId="my-content">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Start Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="my-content">
        <IonList>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/overview" component={Overview} exact={true} />
        <Route path="/home" component={Home} exact={true} />
        <Route path="/login" component={Login} exact={true} />

        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/user/:id" component={UserDetails} />
        <Route
          path="/payment-overview"
          render={props => <PaymentOverview caseData={props as any} />}
        />
        <Route
          path="/account-overview"
          render={props => <AccountOverview caseData={props as any} />}
        />
        <Route
          path="/lender-overview"
          render={props => <LenderOverview lender={props as any} />}
        />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
