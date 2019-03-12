import nock from 'nock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';
import * as actionTypes from '../constants/actionTypes';
import getRepos from './repos';
import * as errorMessages from '../constants/errorMessages';

const mockStore = configureMockStore([promise, thunk]);


const githubBasePath = 'https://api.github.com';
const repoPath = '/orgs/nodejs/repos';

const repos = [
  { name: 'repo1' },
  { name: 'repo2' },
];

describe('Actions::Repos', () => {
  afterEach(() => {
    nock.cleanAll();
  });


  it('should create an action to fetch repository from github', () => {
    nock(githubBasePath)
      .get(repoPath)
      .reply(200, repos);
    const expectedActions = [
      {
        type: actionTypes.GET_REPOS_PENDING,
      },
      {
        type: actionTypes.GET_REPOS_FULFILLED,
        payload: repos,
      },
    ];
    const store = mockStore({ repos: {} });

    return store.dispatch(
      getRepos(),
    )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should create an error action if the request fails', () => {
    nock(githubBasePath)
      .get(repoPath)
      .reply(500);

    const expectedActions = [
      {
        type: actionTypes.GET_REPOS_PENDING,
      },
      {
        type: actionTypes.ERROR_HTTP_INTERNAL_SERVER_ERROR,
        error: new Error(errorMessages.ERROR_HTTP_INTERNAL_SERVER_ERROR),
      },
      {
        type: actionTypes.GET_REPOS_REJECTED,
        error: true,
        payload: new Error(errorMessages.ERROR_HTTP_INTERNAL_SERVER_ERROR),
      },
    ];
    const store = mockStore({ repos: {} });

    return store.dispatch(
      getRepos(),
    )
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
