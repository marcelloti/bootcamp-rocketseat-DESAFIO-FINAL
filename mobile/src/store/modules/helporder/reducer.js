import produce from 'immer';

const INITIAL_STATE = {
  helpOrderList: '',
};

export default function helporder(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@helporder/RELOAD_REQUEST': {
        draft.loading = action.payload.studentid;
        break;
      }
      case '@helporder/RELOAD_SUCCESS': {
        draft.helpOrderList = action.payload.data;
        break;
      }
      default:
    }
  });
}
