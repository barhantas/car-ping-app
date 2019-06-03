import { put, call, takeEvery, select } from "redux-saga/effects";
import {
  sendVerificationCodeLoaded,
  verifyVerificationCodeLoaded
} from "../actions/member";
import firebase from "react-native-firebase";

export function* loadSendVerificationCode({ phoneNumber }) {
  const confirmResult = yield call(() =>
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => confirmResult)
      .catch(err => console.log(err))
  );
  yield put(sendVerificationCodeLoaded(confirmResult));
}

export function* loadVerifyVerificationCode({ verificationCode }) {
  const confirmResult = yield select(({ member }) => member.confirmResult);
  const userData = yield call(() =>
    confirmResult
      .confirm(verificationCode)
      .then(userData => userData)
      .catch(err => console.log(err))
  );
  yield put(verifyVerificationCodeLoaded(userData));
}

export default function* memberService() {
  yield takeEvery("SEND_VERIFICATION_CODE", loadSendVerificationCode);
  yield takeEvery("VERIFY_VERIFICATION_CODE", loadVerifyVerificationCode);
}
