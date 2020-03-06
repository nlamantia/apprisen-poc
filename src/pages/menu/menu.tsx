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

const pages: Page[] = [
    { title: 'Profile', route: '/profile', action: () => null },
    { title: 'Overview', route: '/overview', action: () => null },
    { title: 'Logout', route: '/login', action: () => authService.logout() }
]

const Menu = ( props : any ) => {

    function navigate(page: Page) {
        // menuController.toggle();
        if (props.history.location.pathname !== page.route) {
            page.action();
            props.history.push(page.route);
        }
    }

    return (
        <IonMenu side="end" menuId="menu" contentId={props.pageName}>
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

export default withRouter(Menu);