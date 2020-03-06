import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonPage, IonRow, IonSpinner, IonThumbnail, IonTitle, IonToast, IonToolbar } from "@ionic/react";
import React, { useState } from "react";
import logo from "../../images/apprisen-logo.png";
import { LoginRequest } from "../../models/auth/login-request";
import authService from "../../services/auth.service";

const Login = (props: any) => {

    const passwordInput: any = React.useRef();
    const [credentials, setCredentials] = useState<LoginRequest>({ username: '', password: '' });
    const [loginProcessing, setLoginProcessing] = useState<boolean>(false);
    const [failedLoginAlert, setFailedLoginAlert] = useState<boolean>(false);

    async function login() {
        setLoginProcessing(true)
        const loginResponse = await authService.login(credentials);
        setLoginProcessing(false);
        if (loginResponse.isSuccess) {
            passwordInput.current.value = '';
            props.history.push('/overview');
            setLoginProcessing(false);
        } else {
            setFailedLoginAlert(true);
            setLoginProcessing(false);
        }
    }

    function handleChange(evt: any) {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value })
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonThumbnail class="toolbar-logo" slot={"start"}>
                        <img alt="apprisen-logo" src={logo} />
                    </IonThumbnail>
                    <IonTitle>Apprisen</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size={"12"} sizeMd={"6"} sizeLg={"4"} offsetLg={"4"}>
                            <IonCard class="color">
                                <IonList class="ion-no-padding">
                                    <IonListHeader class={"white"}>
                                        <IonLabel>
                                            <h2>Login Form</h2>
                                        </IonLabel>
                                    </IonListHeader>
                                    <IonItem>
                                        <IonLabel position="floating">Username</IonLabel>
                                        <IonInput name="username" placeholder="Enter your username" onIonChange={(e) => handleChange(e)}></IonInput>
                                    </IonItem>

                                    <IonItem>
                                        <IonLabel position="floating">Password</IonLabel>
                                        <IonInput name="password" placeholder="Enter your password" ref={passwordInput} onIonChange={handleChange} type="password"></IonInput>
                                    </IonItem>
                                    <IonItem className={'full-button'}>
                                        <IonButton className={'full-button'} onClick={() => login()} expand="full">
                                            Login
                                                {loginProcessing ? <span><IonSpinner class={'spinner'} name="crescent" /></span> : null}
                                        </IonButton>
                                    </IonItem>
                                </IonList>
                            </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonToast
                    isOpen={failedLoginAlert}
                    onDidDismiss={() => setFailedLoginAlert(false)}
                    message="Username or password is incorrect"
                    color="danger"
                    duration={4000}
                    header="Failed Login"
                />
            </IonContent>
        </IonPage>
    )
}

export default Login
