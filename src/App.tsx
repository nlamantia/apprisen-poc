import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import React from "react";
import { BrowserRouter, Redirect, Route, withRouter } from "react-router-dom";
import AccountOverview from "./pages/account-overview/account-overview";
import LenderOverview from "./pages/lender/lender-overview";
import Login from "./pages/login/login";
import Overview from "./pages/overview/overview";
import PaymentOverview from "./pages/payment-overview/payment-overview";
import Home from "./pages/user/Home";
import UserDetails from "./pages/user/UserDetails";
import Profile from "./pages/profile/profile";
/* Theme variables */
import "./theme/variables.css";

import { Provider } from 'react-redux'
import {store} from "./config/store";

const Main = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/overview" component={withRouter(Overview)} exact={true} />
          <Route path="/home" component={Home} exact={true} />
          <Route path="/login" component={withRouter(Login)} exact={true} />
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route path="/user/:id" component={UserDetails} />
          <Route path="/profile" component={Profile} />
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
  )
};

const App = () => (
    <Provider store={store()}>
      <Main />
    </Provider>
)

export default App;
