import produce from 'immer';

const INITIAL_STATE = {
  studentData: null,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/STUDENT_UPDATE_OPEN': {
        draft.studentData = action.payload.data;
        break;
      }
      case '@student/STUDENT_CREATE_OPEN': {
        draft.studentData = {};
        break;
      }
      default:
    }
  });
}
