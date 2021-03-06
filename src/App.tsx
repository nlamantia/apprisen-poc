import {
    IonApp,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuButton,
    IonMenuToggle,
    IonRouterOutlet,
    IonTitle,
    IonToolbar
} from "@ionic/react";
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
import {connect, Provider} from 'react-redux'
import {Route, Switch, withRouter} from "react-router-dom";
import AccountOverview from "./pages/account-overview/account-overview";
import LenderOverview from "./pages/lender/lender-overview";
import Login from "./pages/login/login";
import Overview from "./pages/overview/overview";
import Profile from "./pages/profile/profile";
/* Theme variables */
import "./theme/variables.scss";
import {history, store} from "./config/store";

import AdditionalResources from "pages/additional-resources/additional-resources";
import MakePayment from "./pages/payment/make-payment";
import PaymentConfirmation from "./pages/payment/payment-confirmation";
import {bindActionCreators} from "redux";
import {logout} from "./feature/auth/action";
import PrivateRoute from "./common/private-route";
import Verify from "./pages/verify/verify";
import {AuthContextProvider} from "./common/auth-provider";
import {NotificationProvider} from "./common/notification-provider";
import {Logout} from "./pages/logout/logout";
import Contact from "./pages/contact/contact";
import {ConnectedRouter} from "connected-react-router";

interface Page {
    title: string;
    route: string;
    action: Function;
}

const _Main = (props: any) => {
    const {logout} = props;

    const pages: Page[] = [
        {title: 'Overview', route: '/overview', action: (e) => null},
        {title: 'Profile', route: '/profile', action: (e) => null},
        {title: 'Contact Us', route: '/contact', action: (e) => null},
        {title: 'Additional Resources', route: '/resources', action: (e) => null},
        {title: 'Logout', route: '/login', action: (e) => logout()}
    ]

    // @ts-ignore
    return (
        <IonApp>
            <IonMenu side="end" menuId="menu" type="overlay" contentId={'main-content'}>
                <IonHeader class="toolbar-header">
                    <IonToolbar class="toolbar-header">
                        <IonTitle>Menu</IonTitle>
                        <IonButtons slot="end">
                            <IonMenuToggle autoHide={true}>
                                <IonMenuButton menu="menu"/>
                            </IonMenuToggle>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        {pages.map(page => (
                            <IonMenuToggle autoHide={true}>
                                <IonItem
                                    class='clickable ion-activatable'
                                    href={page.route}
                                    routerDirection={'forward'}
                                    key={page.title}
                                    onClick={(e) => page.action()}
                                    button
                                >
                                    <IonLabel>
                                        {page.title}
                                    </IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        ))}
                    </IonList>
                </IonContent>
            </IonMenu>
            <NotificationProvider/>
            <AuthContextProvider>
                <ConnectedRouter history={history as any}>
                    <IonRouterOutlet id={'main-content'}>
                        <Switch>
                            <PrivateRoute path="/overview" component={withRouter(Overview)} exact={true}/>
                            <Route path="/login" component={Login} exact={true}/>
                            <Route path="/logout" component={Logout} exact={true}/>
                            <Route path="/verify" component={withRouter(Verify)} exact={true}/>
                            <PrivateRoute exact path="/" component={withRouter(Overview)}/>
                            <PrivateRoute path="/contact" component={Contact}/>
                            <PrivateRoute path="/profile" component={Profile}/>
                            <PrivateRoute path="/resources" component={AdditionalResources}/>
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
                        </Switch>
                    </IonRouterOutlet>
                </ConnectedRouter>
            </AuthContextProvider>
        </IonApp>
    )
};

const Main = connect(
    state => ({}),
    dispatch => bindActionCreators({
        logout
    }, dispatch)
)(
    _Main
);

const App = () => (
    <Provider store={store}>
        <Main/>
    </Provider>
)

export default App;
