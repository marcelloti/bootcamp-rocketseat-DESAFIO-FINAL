import produce from 'immer';

const INITIAL_STATE = {
  data: null,
};

export default function helporder(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@helporder/MODAL_LOAD': {
        draft.data = {
          ...action.payload.data,
          visible: true,
        };
        break;
      }
      case '@helporder/MODAL_CLOSE': {
        draft.data = {
          ...action.payload.data,
          visible: false,
        };
        break;
      }

      case '@helporder/ANSWER_HELPORDER_SUCCESS': {
        draft.data = {
          data: null,
        };
        break;
      }
      default:
    }
  });
}
