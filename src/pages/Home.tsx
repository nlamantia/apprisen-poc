import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { User } from '../models/User';

function Home() {
  const base = [] as User[]
  const [users, updateUsers] = useState(base)

  useEffect(() => {
      fetch("http://apprisen-poc-api.herokuapp.com/api/users")
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        updateUsers(responseJson)
      })
      .catch(err => console.log(err));
  }, [])

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
              users.map(user => {
                return (
                  <IonItem routerLink={`/user/${user.id}`}>{user.firstName + ' ' + user.lastName}</IonItem>
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

export default Home;
