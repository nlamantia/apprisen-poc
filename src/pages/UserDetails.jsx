import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonLabel, IonButton, IonInput, IonItem } from '@ionic/react';
import React, {useState, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';

function UserDetails(props) {

    const [readOnly, updateReadOnly] = useState(true)
    const [users, updateUsers] = useState([])
    const [userId, updateUserId] = useState(0)


    function editPage() {
        updateReadOnly(!readOnly)
        console.log(readOnly)
    }

    useEffect(() => {
        console.log(props)
        const { match } = props
        console.log(match.params.id)
        fetch(`http://apprisen-poc-api.herokuapp.com/api/user/${match.params.id}`)
        .then(response => response.json())
        .then(json => {
            updateUsers(json)
            updateUserId(match.params.id)
        })
    }, []) // Must pass empty array or will call in an endless loop

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        console.log(e.target.value)
        console.log(users.firstName)

        updateUsers(prevState => {
            return {...prevState, name: value}
        }
        )
    };

    function putUser() {
        const requestParams = {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(users)
        };
        fetch(`http://apprisen-poc-api.herokuapp.com/api/user/${users.id}`, requestParams)
        .then(res => res.text())
        .then(res => console.log(res))
        .catch(err => console.log("APPRISEN ERROR: " + err))
    };

    return( 
    <IonPage>
        <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        <strong>Welcome to {users.firstName + ' ' + users.lastName + "'s"} profile.</strong>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    {readOnly === true 
                    ? 
                    <IonLabel> First name: {users.firstName} </IonLabel> 
                    : <IonInput name="firstName" value={users.firstName} onIonChange={(e) => handleChange(e)} />}
                </IonItem>
                <IonItem>
                {readOnly === true 
                    ? 
                    <IonLabel> Last name: {users.lastName} </IonLabel> 
                    : <IonInput name="lastName" onIonChange={(e) => handleChange(e)} value={users.lastName} />}
                </IonItem>
                <IonItem>
                    <IonLabel>
                        Address: {users.address}
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        City: {users.city}
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        State: {users.state}
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        Zip: {users.zip}
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        Email: {users.email}
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonButton onClick={editPage}>
                        {readOnly === true ? 'Edit' : 'Save'}
                    </IonButton>
                </IonItem>
            </IonContent>
    </IonPage>
    )
  }
  export default UserDetails;