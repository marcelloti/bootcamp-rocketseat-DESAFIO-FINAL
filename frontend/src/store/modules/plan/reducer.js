import produce from 'immer';

const INITIAL_STATE = {
  planData: null,
};

export default function plan(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plan/PLAN_UPDATE_OPEN': {
        draft.planData = action.payload.data;
        break;
      }
      case '@plan/PLAN_CREATE_OPEN': {
        draft.planData = {};
        break;
      }
      default:
    }
  });
}
