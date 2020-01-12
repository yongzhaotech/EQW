import { put, call, all, takeEvery } from "redux-saga/effects";
import * as actions from "../action";
import * as utils from "../utils";

const APIRequest = path => fetch(`${utils.requestUrl}/${path}`)
	.then(data => data.json())
	.catch(error => error);

function* fetchData(action) {
	yield put(actions.loading(true));
	try {
		const data = yield call(APIRequest, action.path);
		if (data.error) {
			yield put(actions.setError(data.error));
		} else {
			yield put(actions.setData(utils.stateKey(action.path), data));
			yield put(actions.clearError());
		}
	} catch (e) {
		yield put(actions.setError(e.error));
	} finally {
		yield put(actions.loading());
	}
}

/*
 * @description list of saga events, add whatever is needed
 */
export default function* RootSaga() {
	yield all([
		takeEvery(actions.FETCH_DATA, fetchData)
	])
};