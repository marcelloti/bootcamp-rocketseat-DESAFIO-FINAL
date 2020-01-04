import produce from 'immer';

const INITIAL_STATE = {
  enrolmentData: null,
};

export default function enrolment(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@enrolment/ENROLMENT_UPDATE_OPEN': {
        draft.enrolmentData = action.payload.data;
        break;
      }
      case '@enrolment/ENROLMENT_CREATE_OPEN': {
        draft.enrolmentData = {};
        break;
      }
      default:
    }
  });
}
