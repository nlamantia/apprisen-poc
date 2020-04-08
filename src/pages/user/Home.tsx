import {
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonTitle,
    IonToolbar,
    withIonLifeCycle
} from '@ionic/react';
import {RefresherEventDetail} from '@ionic/core';
import React, {Component} from 'react';
import {User} from '../../models/User';

class Home extends Component {
    // todo don't store props in state
    state = {
        users: [] as User[]
    };

    // todo handlle with effect, use saga
    ionViewWillEnter() {
        this.getUsers();
    }

    // todo handle with saga
    getUsers(): void {
        // todo move to rest service
        fetch("https://apprisen-poc-api.herokuapp.com/api/users")
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                this.setState({
                    users: responseJson as User[]
                });
            })
            .catch(err => console.log(err));
    }

    doRefresh(event: CustomEvent<RefresherEventDetail>): void {
        setTimeout(() => {
            this.getUsers();
            event.detail.complete();
        }, 1000);
    }

    render() {
        // todo destructure state
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>User List</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonRefresher slot="fixed" onIonRefresh={(e) => this.doRefresh(e)}>
                        <IonRefresherContent/>
                    </IonRefresher>
                    <IonList>
                        {
                            this.state.users.map(user => {
                                return (
                                    <IonItem routerLink={`/user/${user.id}`}>
                                        {user.firstName + ' ' + user.lastName}
                                    </IonItem>
                                )
                            })
                        }
                    </IonList>
                </IonContent>
            </IonPage>
        )
    };
}

export default withIonLifeCycle(Home);
