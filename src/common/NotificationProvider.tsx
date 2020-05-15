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
    useEffect(
        () => {
            // todo diff which loading states have changed
            // todo get messages if any for each changed, toast message
            if (loadingStatus[LOGIN].status === COMPLETED)
                toast("Logged in!") // todo accept message as param
            setLastState(loadingStatus)
        },
        [loadingStatus]
    )

    return (<div><ToastContainer {...{progressStyle: {background: '#6cb33f' }}} /></div>)
}