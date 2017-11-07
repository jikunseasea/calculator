import { combineReducers } from 'redux';
import {
  PUSH_STACK, 
  CLEAR_STACK, 
  // UPDATE_CURRENT,
  DEL_STACK,
  COMPUTE_RESULT, 
} from '../constants';
import { calculateFromArr } from '../logic/util';

const stack = (state=[], action) => {
  switch (action.type) {
    case PUSH_STACK:
      return [...state, action.value];
    case CLEAR_STACK:
      return [];
    case DEL_STACK:
      if (state.length > 0) {
        return state.slice(0, state.length - 1);
      }
      return [];
    default:
      return state;
  }
};

const result = (state=0, action) => {
  switch (action.type) {
    case COMPUTE_RESULT:
      return calulateFromArr(action.arr);
    default:
      return state;
  }
};

export default combineReducers({
  stack,
  result
});