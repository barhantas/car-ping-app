import { put, call, takeEvery } from "redux-saga/effects";
import { sendVerificationCodeLoaded } from "../actions/member";
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

export default function* memberService() {
  yield takeEvery("SEND_VERIFICATION_CODE", loadSendVerificationCode);
}
