import {
    createStore,
    applyMiddleware,
    combineReducers,
    compose,
} from 'redux';
import { purgeStoredState } from 'redux-persist'
import createSagaMiddleware, { END } from 'redux-saga';

import reducers from './reducers';
import rootSaga from './sagas';

import { persistStore, persistCombineReducers } from 'redux-persist';
// import storage from 'redux-persist/es/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
// const persistConfig = {
//   key: 'root',
//   storage,
// }

const sagaMiddleware = createSagaMiddleware();
const makeStore = (initialState) => {
    // Make exception for redux dev tools
    /* eslint-disable no-underscore-dangle */
    /* eslint-disable no-undef */
    // purgeStoredState();
    const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
    /* eslint-enable */
    const rootReducer = persistCombineReducers({
        key: 'root',
        storage: AsyncStorage,
      }, (reducers));
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(sagaMiddleware)),
    );

    // store.runSaga = () => {
    //     // Avoid running twice
    //     if (store.saga) return;
    //     store.saga = sagaMiddleware.run(rootSaga);
    // };

    // store.stopSaga = async () => {
    //     // Avoid running twice
    //     if (!store.saga) return;
    //     store.dispatch(END);
    //     console.log(store.saga.done);
    //     await store.saga.done;
    //     store.saga = null;
    // };

    // store.execSagaTasks = async (isServer, tasks) => {
    //     // run saga
    //     store.runSaga();
    //     // dispatch saga tasks
    //     console.log("tasks-----");
    //     console.log(typeof tasks);
    //     console.log("store.dispatch-----");
    //     console.log(store.dispatch);
    //     tasks(store.dispatch);
    //     // Stop running and wait for the tasks to be done
    //     if (isServer)
    //         await store.stopSaga();
    //     // Re-run on client side
    //     if (!isServer) {
    //         store.runSaga();
    //     }
    // };
    // export const persistor = persistStore(store);

    // Initial run
    const persistor = persistStore(store)
    sagaMiddleware.run(rootSaga)
    // persistor.purge();
    
    return {store, persistor};
};

export default makeStore;