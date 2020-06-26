import {connect} from 'react-redux'
import React, {useEffect, useState} from "react";
import {bindActionCreators} from 'redux'
import {logout} from "../../feature/auth/action";
import {Redirect} from "react-router-dom";
import {BounceLoader} from "react-spinners";

const _Logout = (props: any) => {
    const { credentials, logout } = props;
    const [userCredentials, setUserCredentials] = useState<boolean>(true);

    useEffect(() => {
        if (credentials) {
            logout();
        }
        setUserCredentials(!!credentials);
    }, [credentials]);
    return userCredentials ? <BounceLoader /> :<Redirect to="/login"/>
};

export const Logout = connect(
    state => ({
        credentials: state.auth.credentials
    }),
    dispatch => bindActionCreators({logout}, dispatch))
(_Logout)
