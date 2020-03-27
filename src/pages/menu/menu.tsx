import { IonContent, IonHeader, IonItem, IonList, IonMenu, IonTitle, IonToolbar, IonLabel, IonButtons, IonMenuButton, IonMenuToggle } from '@ionic/react';
import React from 'react';
import authService from '../../services/auth.service'
import { withRouter, RouteComponentProps } from 'react-router';
import { menuController } from "@ionic/core";

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
        <IonMenu side="end" menuId="menu" contentId={pageName}>
            <IonHeader class="toolbar-header">
                <IonToolbar class="toolbar-header">
                    <IonTitle>Menu</IonTitle>
                    <IonButtons slot="end">
                        <IonMenuButton menu="menu"></IonMenuButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {pages.map(page => (
                        <IonMenuToggle>
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
                        </IonMenuToggle>
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
    _Menu
);

export default withRouter(Menu);