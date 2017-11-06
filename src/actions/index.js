import { PUSH_STACK, COMPUTE_RESULT, CLEAR_STACK, UPDATE_CURRENT, DEL_STACK } from '../constants';

export const pushStack = value => ({ type: PUSH_STACK, value });
// export const computeTempResult = () => ({ type: COMPUTE_TEMP_RESULT });
export const computeResult = () => ({ type: COMPUTE_RESULT });
export const clearStack = () => ({ type: CLEAR_STACK });
// export const updateCurrent = value => ({ type: UPDATE_CURRENT, value});
export const delStack = () => ({ type: DEL_STACK });