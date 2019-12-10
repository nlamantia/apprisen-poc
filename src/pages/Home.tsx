import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem } from '@ionic/react';
import React, { Component } from 'react';
import { tsConstructorType } from '@babel/types';
import { User } from '../models/User';

class Home extends Component {
  state = {
    users: [] as User[]
  };

  componentWillReceiveProps() {
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

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>User List</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            {
              this.state.users.map(user => {
                return (
                  <IonItem routerLink={`/user/${user.id}`}>{user.firstName + ' ' + user.lastName}</IonItem>
                )
              })
            }
          </IonList>
        </IonContent>
      </IonPage>
    )
  };
};

export default Home;
