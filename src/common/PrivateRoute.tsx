import {Redirect, Route, useLocation} from "react-router-dom";
import {areCredentialsExpired, logout} from "../services/auth.service";
import {useSelector} from 'react-redux'
import React, {useEffect, useState} from "react";
import {Plugins} from "@capacitor/core";
import {useAuthContext} from "./AuthProvider";
import {IonButton, IonSpinner} from "@ionic/react";

const {Storage} = Plugins;

const PrivateRoute = ({component = {}, render = {}, ...props}: {
    component?: any,
    render?: any,
    path: string,
    exact?: boolean
}) => {

    const {pathname} = useLocation()
    // this is used to subscribe this component to auth state changes
    const authState = useSelector((state) => state.auth)

    const {isVerifiedOptional, isAuthedOptional} = useAuthContext()

    const {
        isVerifiedOptional: {
            value: verified
        },
        isAuthedOptional: {
            value: authed
        }
    } = {isVerifiedOptional, isAuthedOptional}

    const shouldRedirect = (!authed || !verified)

    const [redirectPath, setRedirectPath] = useState("")


    useEffect(() => {
        if (!authed) {
            setRedirectPath('/login')
        } else {
            if (!verified) {
                setRedirectPath('/verify')
            } else {
                if (['/login', '/verify'].includes(pathname)) setRedirectPath('/')
            }
        }
    }, [isVerifiedOptional, isAuthedOptional])

    if ([isVerifiedOptional, isAuthedOptional].some(e => !e.isPresent)) return (
        <IonSpinner class={'spinner'} name="crescent"/>
    )


    if (!authed && isAuthedOptional.isPresent) {
        areCredentialsExpired().then(expired => {
            if (expired) logout()
        })
    }

    const componentToRenderIfAuthorized = component ? (
        <div> {React.createElement(component, props)}</div>
    ) : render

    return (
        <Route {...props} exact
               render={(props => (
                   (shouldRedirect) ? (
                       <Redirect
                           to={{
                               pathname: redirectPath,
                           }}
                       />
                   ) : componentToRenderIfAuthorized
               ))}
        />
    )
}

export default PrivateRoute
