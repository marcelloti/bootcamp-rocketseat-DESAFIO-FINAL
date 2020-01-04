import produce from 'immer';

const INITIAL_STATE = {
  studentid: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.studentid = action.payload.studentid;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }

      // Keeped for tests and future implementation
      case '@auth/SIGN_OUT': {
        draft.studentid = null;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
