import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { rootReducer, rootSaga } from './root';

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, routerMiddleware(history)]

const composeEnhancers = composeWithDevTools({trace: true})


export const store = createStore(rootReducer(history), composeEnhancers(
    applyMiddleware(...middleware),
));

sagaMiddleware.run(rootSaga)
