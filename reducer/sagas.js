import { put, takeEvery, all } from 'redux-saga/effects';

const setRemoteSwitchConfig = function* setRemoteSwitchConfig(action) {
    yield put({ type: 'SET_CONFIG_STARTED', payload: action.payload});
}

const watchRemoteSwitchConfig = function* watchRemoteSwitchConfig() {
    yield takeEvery('SET_CONFIG', setRemoteSwitchConfig);
}

const rootSaga = function* rootSaga() {
    yield all([watchRemoteSwitchConfig()]);
}

export default rootSaga;