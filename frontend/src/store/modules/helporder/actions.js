export function modalOpenRequest(data) {
  return {
    type: '@helporder/MODAL_LOAD',
    payload: { data },
  };
}

export function modalCloseRequest(data) {
  return {
    type: '@helporder/MODAL_CLOSE',
    payload: { data },
  };
}

export function answerHelpOrderRequest(data) {
  return {
    type: '@helporder/ANSWER_HELPORDER_REQUEST',
    payload: { data },
  };
}

export function answerHelpOrderSuccess() {
  return {
    type: '@helporder/ANSWER_HELPORDER_SUCCESS',
  };
}

export function answerHelpOrderFailure() {
  return {
    type: '@helporder/ANSWER_HELPORDER_FAILURE',
  };
}
