export function reloadRequest(studentid) {
  return {
    type: '@helporder/RELOAD_REQUEST',
    payload: { studentid },
  };
}

export function reloadFailure() {
  return {
    type: '@helporder/RELOAD_FAILURE',
  };
}

export function reloadSuccess(data) {
  return {
    type: '@helporder/RELOAD_SUCCESS',
    payload: { data },
  };
}
