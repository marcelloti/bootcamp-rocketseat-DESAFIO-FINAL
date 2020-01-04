export function enrolmentCreateRequest(data) {
  return {
    type: '@enrolment/ENROLMENT_CREATE_REQUEST',
    payload: { data },
  };
}

export function enrolmentUpdateRequest(data) {
  return {
    type: '@enrolment/ENROLMENT_UPDATE_REQUEST',
    payload: { data },
  };
}

export function enrolmentCreateSuccess(data) {
  return {
    type: '@enrolment/ENROLMENT_CREATE_SUCCESS',
    payload: { data },
  };
}

export function enrolmentCreateFailure() {
  return {
    type: '@enrolment/ENROLMENT_CREATE_FAILURE',
  };
}

export function enrolmentCreateOpen() {
  return {
    type: '@enrolment/ENROLMENT_CREATE_OPEN',
  };
}

export function enrolmentUpdateOpen(data) {
  return {
    type: '@enrolment/ENROLMENT_UPDATE_OPEN',
    payload: { data },
  };
}

export function enrolmentUpdateSuccess(data) {
  return {
    type: '@enrolment/ENROLMENT_UPDATE_SUCCESS',
    payload: { data },
  };
}

export function enrolmentUpdateFailure() {
  return {
    type: '@enrolment/ENROLMENT_UPDATE_FAILURE',
  };
}
