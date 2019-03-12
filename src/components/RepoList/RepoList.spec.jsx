import React from 'react';
import { shallow } from 'enzyme';
import RepoList from './RepoList';
import { PENDING } from '../../constants/storeObjectStatuses';

describe('<RepoList />', () => {
  const onRepoClick = jest.fn();

  it('should render an empty list when no data is loaded', () => {
    const repos = {
      data: [],
      status: null,
    };
    const issues = {
      data: [],
      status: null,
    };
    const wrapper = shallow(
      <RepoList
        repos={repos}
        issues={issues}
        selectedRepo=""
        onRepoClick={onRepoClick}
      />,
    );

    expect(wrapper.find('li').length).toEqual(0);
  });

  it('should render "loading" when is fetching the repositories list', () => {
    const repos = {
      data: [],
      status: PENDING,
    };
    const issues = {
      data: [],
      status: null,
    };
    const wrapper = shallow(
      <RepoList
        repos={repos}
        issues={issues}
        selectedRepo=""
        onRepoClick={onRepoClick}
      />,
    );

    expect(wrapper.find('li').length).toEqual(1);
    expect(wrapper.find('li').at(0).text()).toEqual('Loading...');
  });

  it('should render the list of repositories when data is loaded', () => {
    const repositories = [
      { name: 'repo-1' },
      { name: 'repo-2' },
    ];
    const repos = {
      data: repositories,
      status: null,
    };
    const issues = {
      data: [],
      status: null,
    };
    const wrapper = shallow(
      <RepoList
        repos={repos}
        issues={issues}
        selectedRepo=""
        onRepoClick={onRepoClick}
      />,
    );

    expect(wrapper.find('li').length).toEqual(2);
    expect(wrapper.find('li').at(0).text()).toEqual(repositories[0].name);
    expect(wrapper.find('li').at(1).text()).toEqual(repositories[1].name);
  });

  it('should render the list of repositories and the issues of the selected repo', () => {
    const repositories = [
      { name: 'repo-1' },
      { name: 'repo-2' },
    ];
    const issues = [
      { id: 'id1', title: 'title-1' },
      { id: 'id2', title: 'title-2' },
    ];
    const repos = {
      data: repositories,
      status: null,
    };
    const issuesState = {
      data: issues,
      status: null,
    };
    const wrapper = shallow(
      <RepoList
        repos={repos}
        issues={issuesState}
        selectedRepo="repo-2"
        onRepoClick={onRepoClick}
      />,
    );

    expect(wrapper.find('li').length).toEqual(4);
    const issuesList = wrapper.find('li').at(1).find('ul');
    expect(issuesList.length).toEqual(1);
    expect(issuesList.find('li').length).toEqual(2);
    expect(issuesList.find('li').at(0).text()).toEqual(issues[0].title);
    expect(issuesList.find('li').at(1).text()).toEqual(issues[1].title);
  });
});
