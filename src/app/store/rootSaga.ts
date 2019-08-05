/* istanbul ignore file */
import { all, spawn } from 'redux-saga/effects';

export default function * rootSaga() {
  yield all([
    spawn(function * someSaga() {
      yield 'TODO';
    }),
  ]);
}
