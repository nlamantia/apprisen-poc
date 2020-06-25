import {Redirect, Route, useLocation} from "react-router-dom";
import {areCredentialsExpired, logout} from "../services/auth-service";
import {useSelector} from 'react-redux'
import React from "react";
import {Plugins} from "@capacitor/core";
import {useAuthContext} from "./auth-provider";
import {IonSpinner} from "@ionic/react";
import BounceLoader from "react-spinners/BounceLoader";

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

    let redirectPath = '/overview'

    if (!authed) {
        redirectPath = '/login'
    } else {
        if (!verified) {
            redirectPath = '/verify'
        }
    }

    if ([isVerifiedOptional, isAuthedOptional].some(e => !e.isPresent)) {
        return (
            <IonSpinner class={'spinner'} name="crescent"/>
        )
    }

    if (!authed && isAuthedOptional.isPresent) {
        areCredentialsExpired().then(expired => {
            if (expired) logout()
        })
    }

    const componentToRenderIfAuthorized = component ? (
        <>
            <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                opacity: '.5',
                margin: '0px auto',
            }}> <BounceLoader /> </div>
            <div> {React.createElement(component, props)}</div>
        </>
    ) : render

    return (
        <Route {...props} exact
               render={(props => (
                   (shouldRedirect) ? (
                       <>
                           <Redirect
                               to={{
                                   pathname: redirectPath,
                               }}
                           />
                       </>
                   ) : componentToRenderIfAuthorized
               ))}
        />
    )
}

export default PrivateRoute