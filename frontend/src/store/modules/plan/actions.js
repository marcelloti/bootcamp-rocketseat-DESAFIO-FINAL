export function planCreateRequest(data) {
  return {
    type: '@plan/PLAN_CREATE_REQUEST',
    payload: { data },
  };
}

export function planCreateSuccess(data) {
  return {
    type: '@plan/PLAN_CREATE_SUCCESS',
    payload: { data },
  };
}

export function planCreateFailure() {
  return {
    type: '@plan/PLAN_CREATE_FAILURE',
  };
}

export function planCreateOpen() {
  return {
    type: '@plan/PLAN_CREATE_OPEN',
  };
}

export function planUpdateOpen(data) {
  return {
    type: '@plan/PLAN_UPDATE_OPEN',
    payload: { data },
  };
}

export function planUpdateRequest(data) {
  return {
    type: '@plan/PLAN_UPDATE_REQUEST',
    payload: { data },
  };
}

export function planUpdateSuccess(data) {
  return {
    type: '@plan/PLAN_UPDATE_SUCCESS',
    payload: { data },
  };
}

export function planUpdateFailure() {
  return {
    type: '@plan/PLAN_UPDATE_FAILURE',
  };
}
