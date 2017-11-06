import { PUSH_TEMP_STACK, COMPUTE_RESULT, COMPUTE_TEMP_RESULT, CLEAR_TEMP_STACk } from '../constants';

export const pushTempStack = value => ({ type: PUSH_TEMP_STACK, value });
export const computeTempResult = () => ({ type: COMPUTE_TEMP_RESULT });
export const computeResult = () => ({ type: COMPUTE_RESULT });
export const clearTempStack = () => ({ type: CLEAR_TEMP_STACk });