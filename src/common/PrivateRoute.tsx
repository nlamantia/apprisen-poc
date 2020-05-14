import {Redirect, Route, useLocation} from "react-router-dom";
import {areCredentialsExpired, logout} from "../services/auth.service";
import { useSelector } from 'react-redux'
import React from "react";
import {Plugins} from "@capacitor/core";
import {useAuthContext} from "./AuthProvider";
import {IonButton, IonSpinner} from "@ionic/react";

const {Storage} = Plugins;

const PrivateRoute = ({component = {}, render = {}, ...props}: {
    component? : any,
    render? : any,
    path : string,
    exact? : boolean
}) => {

    const { pathname } = useLocation()
    const loginState = useSelector((state) => state)

    const {isVerifiedOptional, isAuthedOptional}  = useAuthContext()
    const { isVerifiedOptional: {value: verified}, isAuthedOptional: {value: authed} } =
                {isVerifiedOptional, isAuthedOptional}

    const shouldRedirect =  (!authed || !verified)
    let redirectPath
    if (!authed) {
        redirectPath = '/login'
    } else {
        if (!verified) {
            redirectPath = '/verify'
        } else {
            if (['/login', '/verify'].includes(pathname)) redirectPath = '/'
        }
    }

    if ( !authed && isAuthedOptional.isPresent) {
        areCredentialsExpired().then( expired => {if (expired) logout()})
    }

    return [isVerifiedOptional, isAuthedOptional].some(e => !e.isPresent) ?
        <IonSpinner class={'spinner'} name="crescent" /> :
        (
            <Route {...props} exact
               render={(props => (
                   ( shouldRedirect ) ? (
                           <Redirect
                               to={{
                                   pathname: redirectPath,
                               }}
                           />
                       ) :
                       (
                           component ? (
                               <div>
                                   {React.createElement(component, props)}
                               </div>
                           ) : render
                       )
               ))}
        />
    )
}

export default PrivateRoute
