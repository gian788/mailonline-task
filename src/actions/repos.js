import * as restApi from '../utils/restApi';
import { GET_REPOS } from '../constants/actionTypes';

const url = 'https://api.github.com/orgs/nodejs/repos';

export default function getFeed() {
  return dispatch => dispatch({
    type: GET_REPOS,
    payload: restApi.get(url)
      .catch(restApi.errorHandler(dispatch)),
  });
}
