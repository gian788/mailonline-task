import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import RepoList from '../../containers/RepoList/RepoList.container';


describe('App', () => {
  it('render "Container"', () => {
    const tree = shallow(<App />);
    expect(tree.find(RepoList).length).toEqual(1);
  });
});
