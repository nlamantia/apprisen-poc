import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem } from '@ionic/react';
import React, { Component } from 'react';
import { tsConstructorType } from '@babel/types';
import users from '../items/availableUsers';

class Home extends Component {
  state = {
    users: users
  };
  
  /*
  componentDidMount() {
    fetch("http://localhost:8080/api/users")
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson)
      this.setState({
        users: responseJson as User[]
      });
    })
    .catch(err => console.log(err));
  }
  */

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Ionic Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            {
              this.state.users.map(user => {
                return (
                  <IonItem routerLink={`/user/${user.id}`}>{user.name}</IonItem>
                )
              })
            }
          </IonList>
          {/* The world is your oyster.
          <p>
            If you get lost, the{' '}
            <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/">
              docs
            </a>{' '}
            will be your guide.
          </p> */}
        </IonContent>
      </IonPage>
    )
  };
};

export default Home;
