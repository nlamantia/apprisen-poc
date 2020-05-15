import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer, rootSaga } from './root'
import { composeWithDevTools } from 'redux-devtools-extension';


export const store = () => {
    const sagaMiddleware = createSagaMiddleware();

    const middleware = [sagaMiddleware]

    const composeEnhancers = composeWithDevTools({trace: true})

    const store = createStore(rootReducer(), composeEnhancers(
        applyMiddleware(...middleware),
    ));

    sagaMiddleware.run(rootSaga)

    return store
}