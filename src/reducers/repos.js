import { GET_REPOS_FULFILLED, GET_REPOS_PENDING, GET_REPOS_REJECTED } from '../constants/actionTypes';
import { FULFILLED, PENDING, REJECTED } from '../constants/storeObjectStatuses';
import globalInitialState from './initialState';

const initialState = globalInitialState.repos;

export default function (state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_REPOS_FULFILLED:
      newState = Object.assign({}, state, { data: action.payload, status: FULFILLED });
      return newState;
    case GET_REPOS_PENDING:
      newState = Object.assign({}, initialState, { status: PENDING });
      return newState;
    case GET_REPOS_REJECTED:
      newState = Object.assign({}, initialState, { status: REJECTED });
      return newState;
    default:
      return state;
  }
}
