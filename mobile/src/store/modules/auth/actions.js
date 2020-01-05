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

// Keeped for tests and future implementation
export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
