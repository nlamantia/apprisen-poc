import {connect} from 'react-redux'
import React, {useEffect} from "react";
import {bindActionCreators} from 'redux'
import {logout} from "../../feature/auth/action";
import {Redirect} from "react-router-dom";

const _Logout = (props: any) => {useEffect(props.logout, []) ; return <Redirect to="/login"/>}

export const Logout = connect(
    state => ({}),
    dispatch => bindActionCreators({logout}, dispatch))
(_Logout)
