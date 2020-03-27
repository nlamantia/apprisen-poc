import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer, rootSaga } from './root'


export const store = () => {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        rootReducer,
        applyMiddleware(sagaMiddleware)
    )

    sagaMiddleware.run(rootSaga)

    return store
}