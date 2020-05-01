import {
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuButton,
    IonMenuToggle,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {connect} from 'react-redux'
import React from 'react';
import { logout } from '../../feature/auth/action'
import {withRouter} from 'react-router';
import {bindActionCreators} from "redux";

interface Page {
    title: string;
    route: string;
    action: Function;
}

const _Menu = ( props : any ) => {

    const { logout } = props

    const pages: Page[] = [
        { title: 'Profile', route: '/profile', action: () => null },
        { title: 'Overview', route: '/overview', action: () => null },
        { title: 'Logout', route: '/login', action: () => logout() }
    ]

    function navigate(page: Page) {
        // menuController.toggle();
        if (props.history.location.pathname !== page.route) {
            page.action();
            props.history.push(page.route);
        }
    }

    const { pageName } = props

    return (
        <IonMenu side="end" menuId="menu" type="overlay" contentId={pageName}>
            <IonHeader class="toolbar-header">
                <IonToolbar class="toolbar-header">
                    <IonTitle>Menu</IonTitle>
                    <IonButtons slot="end">
                        <IonMenuToggle>
                            <IonMenuButton menu="menu"></IonMenuButton>
                        </IonMenuToggle>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {pages.map(page => (
                            <IonItem
                                class='clickable ion-activatable'
                                key={page.title}
                                button
                                onClick={() => navigate(page)}
                            >
                                <IonLabel>
                                    {page.title}
                                </IonLabel>
                            </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonMenu>
    )
}

const Menu = connect(
    state => ({}),
    dispatch => bindActionCreators({
        logout
    }, dispatch)
)(
    withRouter(_Menu)
);

export default Menu;