export function signInRequest(studentid) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { studentid },
  };
}

export function signInSuccess(studentid) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { studentid },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
