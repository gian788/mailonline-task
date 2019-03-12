import { hot } from 'react-hot-loader';
import React from 'react';
import RepoList from '../../containers/RepoList/RepoList.container';

export function App() {
  return (
    <div>
      <RepoList />
    </div>
  );
}

export default hot(module)(App);
