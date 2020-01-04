export function studentCreateRequest(data) {
  return {
    type: '@student/STUDENT_CREATE_REQUEST',
    payload: { data },
  };
}

export function studentCreateSuccess(data) {
  return {
    type: '@student/STUDENT_CREATE_SUCCESS',
    payload: { data },
  };
}

export function studentCreateFailure() {
  return {
    type: '@student/STUDENT_CREATE_FAILURE',
  };
}

export function studentCreateOpen() {
  return {
    type: '@student/STUDENT_CREATE_OPEN',
  };
}

export function studentUpdateOpen(data) {
  return {
    type: '@student/STUDENT_UPDATE_OPEN',
    payload: { data },
  };
}

export function studentUpdateRequest(data) {
  return {
    type: '@student/STUDENT_UPDATE_REQUEST',
    payload: { data },
  };
}

export function studentUpdateSuccess(data) {
  return {
    type: '@student/STUDENT_UPDATE_SUCCESS',
    payload: { data },
  };
}

export function studentUpdateFailure() {
  return {
    type: '@student/STUDENT_UPDATE_FAILURE',
  };
}
