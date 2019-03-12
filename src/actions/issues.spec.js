import nock from 'nock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';
import * as actionTypes from '../constants/actionTypes';
import getIssues from './issues';
import * as errorMessages from '../constants/errorMessages';

const mockStore = configureMockStore([promise, thunk]);

const repoName = 'repo-name';
const githubBasePath = 'https://api.github.com';
const repoPath = `/repos/nodejs/${repoName}/issues`;

const issues = [
  { title: 'title 1' },
  { title: 'title 2' },
];

describe('Actions::Issues', () => {
  afterEach(() => {
    nock.cleanAll();
  });


  it('should create an action to fetch repo issues from github', () => {
    nock(githubBasePath)
      .get(repoPath)
      .query({ state: 'open' })
      .reply(200, issues);
    const expectedActions = [
      {
        type: actionTypes.GET_ISSUES_PENDING,
      },
      {
        type: actionTypes.GET_ISSUES_FULFILLED,
        payload: issues,
      },
    ];
    const store = mockStore({ issues: {} });

    return store.dispatch(
      getIssues(repoName),
    )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should create an error action if the request fails', () => {
    nock(githubBasePath)
      .get(repoPath)
      .query({ state: 'open' })
      .reply(500);

    const expectedActions = [
      {
        type: actionTypes.GET_ISSUES_PENDING,
      },
      {
        type: actionTypes.ERROR_HTTP_INTERNAL_SERVER_ERROR,
        error: new Error(errorMessages.ERROR_HTTP_INTERNAL_SERVER_ERROR),
      },
      {
        type: actionTypes.GET_ISSUES_REJECTED,
        error: true,
        payload: new Error(errorMessages.ERROR_HTTP_INTERNAL_SERVER_ERROR),
      },
    ];
    const store = mockStore({ issues: {} });

    return store.dispatch(
      getIssues(repoName),
    )
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should not create an action if no repo name is passed', () => {
    const dispatch = jest.fn();
    expect(typeof (getIssues())).toEqual('function');
    getIssues()(dispatch);
    expect(dispatch).not.toBeCalled();
  });
});
