import {Redirect, Route, useLocation} from "react-router-dom";
import {areCredentialsExpired, logout} from "../services/auth.service";
import { useSelector } from 'react-redux'
import React, {useEffect, useState} from "react";
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
    const state = useSelector((state) => state)

    const {isVerifiedOptional, isAuthedOptional}  = useAuthContext()
    const { isVerifiedOptional: {value: verified}, isAuthedOptional: {value: authed} } =
                {isVerifiedOptional, isAuthedOptional}


    const shouldRedirect =  (!authed || !verified)

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
