import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import {useSelector} from 'react-redux'
import {isAuthenticated, isVerified} from "../services/auth.service";

export const AuthContext = createContext(null)
export const AuthContextProvider = props => {
    const [isAuthedOptional, setIsAuthedOptional] = useState({ isPresent: false, value: undefined })
    const [isVerifiedOptional, setIsVerifiedOptional] = useState({ isPresent: false, value: undefined })

    const state = useSelector(state => state.common.status)

    useEffect( () => {
        (async () => {
            setIsAuthedOptional({
                isPresent: true,
                value: await isAuthenticated()
            })
            setIsVerifiedOptional({
                isPresent: true,
                value: await isVerified(),
            })
        })()
    }, [state])

    const authData = useMemo(() => ( {isVerifiedOptional, isAuthedOptional} ), [isVerifiedOptional, isAuthedOptional])

    return <AuthContext.Provider value={authData} {...props} />
}

export const useAuthContext = () => useContext(AuthContext)

