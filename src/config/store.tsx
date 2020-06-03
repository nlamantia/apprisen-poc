import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer, rootSaga } from './root'
import { composeWithDevTools } from 'redux-devtools-extension';
import {routerMiddleware} from "connected-react-router";

export const history = createBrowserHistory()

export const store = () => {
    const sagaMiddleware = createSagaMiddleware();

    const middleware = [sagaMiddleware, routerMiddleware(history)]

    const composeEnhancers = composeWithDevTools({trace: true})

    const store = createStore(rootReducer(history), composeEnhancers(
        applyMiddleware(...middleware),
    ));

    sagaMiddleware.run(rootSaga)

    return store
}