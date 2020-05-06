import {IonApp, IonRouterOutlet} from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
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
import {Redirect, Route, withRouter} from "react-router-dom";
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

import {Provider} from 'react-redux'
import {store} from "./config/store";
import MakePayment from "./pages/payment/make-payment";
import PaymentConfirmation from "./pages/payment/payment-confirmation";
import PrivateRoute from "./common/PrivateRoute";



const Main = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <PrivateRoute path="/overview" component={withRouter(Overview)} exact={true} />
          <PrivateRoute path="/home" component={Home} exact={true} />
          <Route path="/login" component={withRouter(Login)} exact={true} />
          <PrivateRoute exact path="/" component={() => <Redirect to="/overview" />} />
          <PrivateRoute path="/user/:id" component={UserDetails} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute
            path="/payment-overview"
            component={PaymentOverview}
          />
          <PrivateRoute
            path="/account-overview"
            component={AccountOverview}
          />
          <PrivateRoute
            path="/lender-overview"
            component={LenderOverview}
          />
          <PrivateRoute
            path="/make-payment"
            component={withRouter(MakePayment)}
            />

            <PrivateRoute
              path="/payment-confirmation"
              component={withRouter(PaymentConfirmation)}
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
