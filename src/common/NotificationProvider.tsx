// @ts-ignore
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import React, {useEffect, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import {LOGIN, VERIFY} from "../feature/auth/action";
import {COMPLETED, IN_PROGRESS} from "../feature/common/reducer";

export const NotificationProvider = () => {
    const [lastState, setLastState] = useState(null)
    const loadingStatus = useSelector(state => state.common.status)

    return (<div><ToastContainer {...{progressStyle: {background: '#6cb33f' }}} /></div>)
}