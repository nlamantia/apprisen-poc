// @ts-ignore
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NotificationProvider = () => {
    const [lastState, setLastState] = useState(null)
    const loadingStatus = useSelector(state => state.common.status)

    return (<div><ToastContainer {...{progressStyle: {background: '#6cb33f' }}} /></div>)
}