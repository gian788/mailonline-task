import * as restApi from '../utils/restApi';
import { GET_ISSUES } from '../constants/actionTypes';


export default function getIssues(repoName) {
  const url = `https://api.github.com/repos/nodejs/${repoName}/issues`;
  return (dispatch) => {
    if (!repoName) {
      return null;
    }
    return dispatch({
      type: GET_ISSUES,
      payload: restApi.get(url, { state: 'open' })
        .catch(restApi.errorHandler(dispatch)),
    });
  };
}
