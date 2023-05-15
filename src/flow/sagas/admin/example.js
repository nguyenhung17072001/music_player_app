import { take, put, call, takeEvery } from 'redux-saga/effects';
import {
    exampleService,
    
} from '../service/example'
import { updateDeviceToken } from '../services/notificationRt.js';
// import { setCookie, removeCookie } from '../../util/cookie';
import { HttpResponseObject, ErrorHttpResponseObject, ServerErrorHttpResponseObject } from "../../util/http";

import {
    actionStart,
    actionSuccess,
    actionFail,
    //
    

} from '../../reducers/admin/example';


import AsyncStorage from '@react-native-async-storage/async-storage';

export function* exampleAction(action) {
    // try {
        console.log("+++++++++++++++++++++++++++++++++++++++++action");
        console.log(action);

        const res = yield call(exampleService, action.payload);
        console.log('res--------', res)
        const resObject = new HttpResponseObject(res);
        console.log('22222222222: ', resObject)
        if (resObject.isSuccess()) {

            
            /* yield call(AsyncStorage.setItem, 'token', res.data.data.token);
            yield call(AsyncStorage.setItem, 'user', JSON.stringify(res.data.data));
            yield call(AsyncStorage.setItem, 'loginned', JSON.stringify(true)); */
            
            yield put(actionSuccess(resObject.getData()));
            

        }
        
        else {
            let errorObject = (new ErrorHttpResponseObject(res)).getErrorObject();
            console.log(("res"));
            console.log((res));
            console.log(new ErrorHttpResponseObject(res));
            console.log('err: ', errorObject);
            yield put(actionFail(errorObject));
            
        }

}


export function* watchAdminExample() {
    
    
    yield takeEvery(actionStart, exampleAction);
    
}