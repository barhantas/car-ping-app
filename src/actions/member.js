import { errorMessages } from "../constants/messages";
export function sendVerificationCode(phoneNumber) {
  console.log(phoneNumber);
  return {
    type: "SEND_VERIFICATION_CODE",
    phoneNumber: phoneNumber
  };
}

export function sendVerificationCodeLoaded(confirmResult) {
  console.log(confirmResult);
  return {
    type: "VERIFICATION_CODE_SENT",
    confirmResult: confirmResult
  };
}

export function verifyVerificationCode(formData) {
  const { smsVerificationCode } = formData;

  return dispatch =>
    new Promise(async (resolve, reject) =>
      confirmResult
        .confirm(smsVerificationCode)
        .then(user =>
          resolve(dispatch({ type: "SEND_VERIFICATION_CODE", data: user }))
        )
        .catch(reject)
    ).catch(err => {
      throw err.message;
    });
}
