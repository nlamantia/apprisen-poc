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
import {connect, useSelector} from 'react-redux'
import React, {useEffect, useState} from "react";
import {bindActionCreators} from 'redux'
import logo from "../../images/apprisen-logo.png";
import {LoginRequest} from "../../models/auth/login-request";
import {login, logout, resetLoginStatus} from "../../feature/auth/action";
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {useAuthContext} from "../../common/AuthProvider";
import {withRouter} from "react-router";
import {Redirect} from "react-router-dom";

const _Logout = (props: any) => {useEffect(props.logout, []) ; return <Redirect to="/login"/>}

export const Logout = connect(
    state => ({
        loginStatus: state.auth.loginStatus,
    }),dispatch => bindActionCreators({logout}, dispatch))
(_Logout)
