import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
import React, {useState} from 'react';
import users from '../items/availableUsers';
import {Row, Col} from 'react-bootstrap';

function UserDetails(props) {
    const user = {
        users: users
    }

    const [readOnly, updateReadOnly] = useState(false)

    function editPage() {
        updateReadOnly = !updateReadOnly
        console.log(readOnly)
    }

    return( 
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <Row>
                    <Col xl={6}>
                        <IonTitle>
                            {user.users.map(person => {
                                if (person.id === props.match.params.id) {
                                    return (
                                        <>
                                        <IonLabel><strong>{"Welcome to " + person.name + "'s Profile!"}</strong></IonLabel> <br /><br />
                                        <IonLabel>Name: {person.name} </IonLabel> <br /><br />
                                        <IonLabel>Address: {person.address} </IonLabel> <br /><br />
                                        <IonLabel>Phone: {person.phone} </IonLabel> <br /><br />
                                        </>
                                    )
                                }
                            })}
                        </IonTitle>
                    </Col>
                    <Col xl={6}>
                    <IonTitle>
                            {user.users.map(person => {
                                if (person.id === props.match.params.id) {
                                    return (
                                        <>
                                        <IonLabel><strong>{"Welcome to " + person.name + "'s Profile!"}</strong></IonLabel> <br /><br />
                                        <IonLabel>Name: {person.name} </IonLabel> <br /><br />
                                        <IonLabel>Address: {person.address} </IonLabel> <br /><br />
                                        <IonLabel>Phone: {person.phone} </IonLabel> <br /><br />
                                        </>
                                    )
                                }
                            })}
                        </IonTitle>
                    </Col>
                </Row>
            </IonToolbar>
            <IonButton onClick={editPage}>
                Click to edit your content
            </IonButton>
        </IonHeader>
    </IonPage>
    )
  }
  export default UserDetails;