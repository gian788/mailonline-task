import { GET_ISSUES_FULFILLED, GET_ISSUES_PENDING, GET_ISSUES_REJECTED } from '../constants/actionTypes';
import { FULFILLED, PENDING, REJECTED } from '../constants/storeObjectStatuses';
import globalInitialState from './initialState';

const initialState = globalInitialState.issues;

export default function (state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ISSUES_FULFILLED:
      newState = Object.assign({}, state, { data: action.payload, status: FULFILLED });
      return newState;
    case GET_ISSUES_PENDING:
      newState = Object.assign({}, initialState, { status: PENDING });
      return newState;
    case GET_ISSUES_REJECTED:
      newState = Object.assign({}, initialState, { status: REJECTED });
      return newState;
    default:
      return state;
  }
}
