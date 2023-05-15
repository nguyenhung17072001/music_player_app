import { all } from "redux-saga/effects";
import { watchAdminExample } from "./admin/example";

export default function* rootSaga() {
    try {
        yield all([
            watchAdminExample(),

        ]);
    } catch (err) {
        console.log('err: ', err);
    }
}