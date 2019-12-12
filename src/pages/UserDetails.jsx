import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLabel, IonButton, IonInput, IonItem } from '@ionic/react';
import React, {useState, useEffect} from 'react';

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
        fetch(`http://apprisen-poc-api.herokuapp.com/api/user/${match.params.id}`)
        .then(response => response.json())
        .then(json => {
            updateUsers(json)
            updateUserId(match.params.id)
        })
    }, []) // Must pass empty array or will call in an endless loop

    function handleChange(e) {
        const val = e.target.value;
        const name = e.target.name;
        console.log(val)
        updateUsers(prevState => {
            return {...prevState, [name]: val}
        })
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

    function savePage() {
        putUser()
        updateReadOnly(!readOnly)
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
                    : <IonInput name="firstName" value={users.firstName} onIonChange={(e) => handleChange(e)}> First name: </IonInput> }
                </IonItem>
                <IonItem>
                {readOnly === true 
                    ? 
                    <IonLabel> Last name: {users.lastName} </IonLabel> 
                    : <IonInput name="lastName" value={users.lastName} onIonChange={(e) => handleChange(e) }> Last name: </IonInput> }
                </IonItem>
                <IonItem>
                {readOnly === true 
                    ? 
                    <IonLabel> Address: {users.address} </IonLabel> 
                    : <IonInput name="address" value={users.address} onIonChange={(e) => handleChange(e) }> Address: </IonInput> }
                </IonItem>
                <IonItem>
                {readOnly === true 
                    ? 
                    <IonLabel> City: {users.city} </IonLabel> 
                    : <IonInput name="city" value={users.city} onIonChange={(e) => handleChange(e) }> City: </IonInput>  }
                </IonItem>
                <IonItem>
                {readOnly === true 
                    ? 
                    <IonLabel> State: {users.state} </IonLabel> 
                    : <IonInput name="state" value={users.state} onIonChange={(e) => handleChange(e) }> State: </IonInput> }
                </IonItem>
                <IonItem>
                {readOnly === true 
                    ? 
                    <IonLabel> Zip: {users.zip} </IonLabel> 
                    : <IonInput name="zip" value={users.zip} onIonChange={(e) => handleChange(e) } > Zip: </IonInput> }
                </IonItem>
                <IonItem>
                {readOnly === true 
                    ? 
                    <IonLabel> Email: {users.email} </IonLabel> 
                    : <IonInput name="email" value={users.email} onIonChange={(e) => handleChange(e) }> Email: </IonInput> }
                </IonItem>
                <IonItem>
                    {
                        readOnly ? <IonButton onClick={() => editPage()}>Edit</IonButton> :
                        <IonButton onClick={() => savePage()}>Save</IonButton>
                    }
                </IonItem>
            </IonContent>
    </IonPage>
    )
  }
  export default UserDetails;