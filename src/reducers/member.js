export default function userReducer(
  state = {
    verificationCodeSending: false,
    verificationCodeVerifying: false,
    confirmResult: {},
    userData: {}
  },
  action
) {
  switch (action.type) {
    case "SEND_VERIFICATION_CODE": {
      console.log(action);
      return {
        ...state,
        verificationCodeSending: true
      };
    }
    case "VERIFICATION_CODE_SENT": {
      console.log(action);
      return {
        ...state,
        verificationCodeSending: false,
        confirmResult: action.confirmResult
      };
    }
    case "VERIFY_VERIFICATION_CODE": {
      return { ...state, verificationCodeVerifying: true };
    }
    case "VERIFICATION_CODE_VERIFIED": {
      return {
        ...state,
        verificationCodeVerifying: false,
        userData: action.userData
      };
    }
    default:
      return state;
  }
}
