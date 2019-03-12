import React from 'react';
import { shallow } from 'enzyme';
import RepoList from '../../components/RepoList/RepoList';
import { RepoListContainer } from './RepoList.container';

describe('<RepoListContainer />', () => {
  const repos = {
    data: [],
    status: null,
  };
  const issues = {
    data: [],
    status: null,
  };
  const actions = {
    getRepos: jest.fn(),
    getIssues: jest.fn(),
  };

  it('should have the right component with props', () => {
    const wrapper = shallow(
      <RepoListContainer
        repos={repos}
        issues={issues}
        actions={actions}
      />,
    );
    const repoList = wrapper.find(RepoList);

    expect(repoList.length).toEqual(1);
    expect(repoList.prop('repos')).toEqual(repos);
    expect(repoList.prop('issues')).toEqual(issues);
    expect(repoList.prop('selectedRepo')).toEqual('');
    expect(typeof repoList.prop('onRepoClick')).toEqual('function');
  });

  it('should call getIssues onRepoClick', () => {
    const repoName = 'repo-name';
    const wrapper = shallow(
      <RepoListContainer
        repos={repos}
        issues={issues}
        actions={actions}
      />,
    );
    const repoList = wrapper.find(RepoList);
    repoList.prop('onRepoClick')(repoName);
    wrapper.update();
    expect(actions.getIssues).toBeCalledWith(repoName);
    expect(wrapper.find(RepoList).prop('selectedRepo')).toEqual(repoName);
  });
});
