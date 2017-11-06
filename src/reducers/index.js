import { combineReducers } from 'redux';
import { PUSH_TEMP_STACK, COMPUTE_TEMP_RESULT, COMPUTE_RESULT, CLEAR_TEMP_STACK } from '../constants';

const tempStack = (state=[], action) => {
  switch (action.type) {
    case PUSH_TEMP_STACK:
      return [...state, action.value];
    case CLEAR_TEMP_STACK:
      return [];
    default:
      return state;
  }
};


const tempResult = (state=0, action) => {
  switch (action.type) {
    case COMPUTE_TEMP_RESULT:
    case CLEAR_TEMP_STACK:
      return 0;
    default:
      return state;
  }
};

const result = (state=0, action) => {
  switch (action.type) {
    case COMPUTE_RESULT:
    case CLEAR_TEMP_STACK:
     return 0;
    default:
      return state;
  }
};

export default combineReducers({
  tempStack,
  tempResult,
  result
});