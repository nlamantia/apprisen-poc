import {Redirect, Route} from "react-router-dom";
import {isAuthenticated} from "../services/auth.service";
import React, {useEffect, useState} from "react";

const PrivateRoute = ({component = {}, render = {}, ...props}: {
    component? : any,
    render? : any,
    path : string,
    exact? : boolean
}) => {
    const [isAuthedOptional, setIsAuthedOptional] = useState({ isPresent: false, value: undefined })

    useEffect( () => {
        const determineIfUserIsAuthenticated =  async () => {
            const value = await isAuthenticated()
            setIsAuthedOptional({isPresent: true, value})
        }
        determineIfUserIsAuthenticated()
    }, [])

    if (!isAuthedOptional.isPresent) return (<div />)
    const { value : isAuthed } = isAuthedOptional

    const isVerified = true

    const shouldRedirect =  (!isAuthed || !isVerified)
    const pathname = isAuthed ? '/login' : '/verify'

    return (
        <Route {...props} exact
               render={(props => (
                   shouldRedirect ? (
                           <Redirect
                               to={{
                                   pathname: '/login',
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
