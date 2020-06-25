import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar,
    withIonLifeCycle
} from "@ionic/react";
import React, {Component} from "react";
import {User} from "../../models/User";

class UserDetails extends Component {
    state = {
        userId: 0,
        user: new User(),
        readOnly: true
    };

    // componentDidMount() {
    //     const {match} = this.props as any;
    //     this.getUser(match.params.id);
    // }

    ionViewWillEnter() {
        const {match} = this.props as any;
        if (match.params.id !== this.state.userId) {
            this.getUser(match.params.id);
        }
    }

    getUser(userId: number) {
        fetch(`https://apprisen-poc-api.herokuapp.com/api/user/${userId}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    userId: userId,
                    user: json as User
                });
            })
    }

    putUser() {
        const requestParams = {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(this.state.user)
        };
        fetch(`https://apprisen-poc-api.herokuapp.com/api/user/${this.state.user.id}`, requestParams)
            .then(res => res.text())
    }

    handleChange(e: any) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [name]: value
            }
        })
    }

    editPage() {
        this.setState({
            ...this.state,
            readOnly: false
        })
    }

    savePage() {
        this.putUser();
        this.setState({
            ...this.state,
            readOnly: true
        });
    }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/home" />
                        </IonButtons>
                        <IonTitle>{this.state.user.firstName + ' ' + this.state.user.lastName + '\'s Profile'}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonItem>
                        <IonLabel>First name: </IonLabel>
                        <IonInput
                            name="firstName"
                            readonly={this.state.readOnly}
                            onIonChange={(e) => this.handleChange(e)}
                            value={this.state.user.firstName}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Last name: </IonLabel>
                        <IonInput name="lastName"
                                  readonly={this.state.readOnly}
                                  onIonChange={(e) => this.handleChange(e)}
                                  value={this.state.user.lastName}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Address: </IonLabel>
                        <IonInput name="address"
                                  readonly={this.state.readOnly}
                                  onIonChange={(e) => this.handleChange(e)}
                                  value={this.state.user.address}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel>City: </IonLabel>
                        <IonInput name="city"
                                  readonly={this.state.readOnly}
                                  onIonChange={(e) => this.handleChange(e)}
                                  value={this.state.user.city}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel>State: </IonLabel>
                        <IonInput name="state"
                                  readonly={this.state.readOnly}
                                  onIonChange={(e) => this.handleChange(e)}
                                  value={this.state.user.state}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Zip Code: </IonLabel>
                        <IonInput name="zip"
                                  readonly={this.state.readOnly}
                                  onIonChange={(e) => this.handleChange(e)}
                                  value={this.state.user.zip}/>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Email Address: </IonLabel>
                        <IonInput name="email"
                                  readonly={this.state.readOnly}
                                  onIonChange={(e) => this.handleChange(e)}
                                  value={this.state.user.email}/>
                    </IonItem>
                    {
                        this.state.readOnly ? <IonButton onClick={() => this.editPage()}>Edit</IonButton> :
                            <IonButton onClick={() => this.savePage()}>Save</IonButton>
                    }

                </IonContent>
            </IonPage>
        );
    }
};

export default withIonLifeCycle(UserDetails);
