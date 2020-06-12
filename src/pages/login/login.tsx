import { InAppBrowser } from '@ionic-native/in-app-browser';
import {
    IonButton,
    IonCard,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonRow,
    IonThumbnail,
    IonTitle,
    IonToast,
    IonToolbar
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from 'react-redux';
import { withRouter } from "react-router";
import { bindActionCreators } from 'redux';
import { useAuthContext } from "../../common/AuthProvider";
import { login, resetLoginStatus } from "../../feature/auth/action";
import logo from "../../images/apprisen-logo.png";
import { LoginRequest } from "../../models/auth/login-request";

const _Login = (props: any) => {

    const passwordInput: any = React.useRef();
    const [credentials, setCredentials] = useState<LoginRequest>({ username: '', password: '' });
    const [failedLoginAlert, setFailedLoginAlert] = useState<boolean>(false);


    const loginState = useSelector(state => state.common.status.login)
    const {isAuthedOptional }  = useAuthContext()

    useEffect(() => {
        if (isAuthedOptional.isPresent && isAuthedOptional.value) { props.history.push('/'); }
    }, [isAuthedOptional])

    function handleChange(evt: any) {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value })
    }
    const handleLoginClick = () => {
        const { login } = props
        login(credentials)
    }

    const handleAccountCreationClick = () => {
        InAppBrowser.create("https://my.apprisen.com/myapprisen/NewAccount.aspx",'_system', 'location=yes');
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
                                        <IonButton className={'full-button'} onClick={handleLoginClick} expand="full">
                                            Login
                                        </IonButton>
                                    </IonItem>
                                    <IonItem className={'full-button'}>
                                        <IonButton className={'full-button'} expand="full" onClick={handleAccountCreationClick}>Create Account</IonButton>
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


const Login = withRouter(connect(
    state => ({
        loginStatus: state.auth.loginStatus,
    }),
    dispatch => bindActionCreators({
        resetLoginStatus,
        login
    }, dispatch)
)(
    _Login
));

export default Login
