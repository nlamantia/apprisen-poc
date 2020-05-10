import {Redirect, Route} from "react-router-dom";
import {isAuthenticated, isVerified} from "../services/auth.service";
import { useLocation } from 'react-router-dom'
import React, {useEffect, useState} from "react";
import {Plugins} from "@capacitor/core";

const {Storage} = Plugins;

const PrivateRoute = ({component = {}, render = {}, ...props}: {
    component? : any,
    render? : any,
    path : string,
    exact? : boolean
}) => {
    const [isAuthedOptional, setIsAuthedOptional] = useState({ isPresent: false, value: undefined })
    const [isVerifiedOptional, setIsVerifiedOptional] = useState({ isPresent: false, value: undefined })

    const location = useLocation()

    useEffect( () => {
        const determineUserStatus =  async () => {
            const creds = (await Storage.get({key: 'credentials'})).value;
            const authenticated = isAuthenticated(creds);
            const verified = await isVerified()
            setIsAuthedOptional({isPresent: true, value: authenticated})
            setIsVerifiedOptional({isPresent: true, value: verified})
        }
        determineUserStatus()
    }, [])

    if (!isAuthedOptional.isPresent) return (<div />)
    const { value : authed } = isAuthedOptional

    if (!isVerifiedOptional.isPresent) return (<div />)
    const { value : verified } = isVerifiedOptional

    const shouldRedirect =  (!authed || !verified)
    const pathname = !authed ? '/login' : '/verify'

    return (
        <Route {...props} exact
               render={(props => (
                   ( shouldRedirect && pathname !== location.pathname ) ? (
                           <Redirect
                               to={{
                                   pathname,
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
