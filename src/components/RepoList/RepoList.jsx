import React from 'react';
import PropTypes from 'prop-types';
import { PENDING, REJECTED } from '../../constants/storeObjectStatuses';
import { stateFetchedArray } from '../../utils/types';

function buildStatus(status) {
  if (status === PENDING) {
    return (<li>Loading...</li>);
  }
  if (status === REJECTED) {
    return (<li>Ops! An error occured!</li>);
  }
  return '';
}

export class Feed extends React.Component {
  constructor() {
    super();
    this.buildRepo = this.buildRepo.bind(this);
    this.buildIssuesList = this.buildIssuesList.bind(this);
  }

  buildRepo(repo) {
    const { onRepoClick, selectedRepo } = this.props;
    const { name } = repo;
    return (
      <li key={name}>
        <span
          role="button"
          tabIndex="0"
          onClick={() => onRepoClick(name)}
          onKeyPress={() => onRepoClick(name)}
        >
          {name}
        </span>
        {name === selectedRepo && this.buildIssuesList()}
      </li>
    );
  }

  buildIssuesList() {
    const { issues } = this.props;
    return (
      <ul>
        {
          buildStatus(issues.status)
        }
        {
          issues.data.map(({ id, title }) => <li key={id}>{title}</li>)
        }
      </ul>
    );
  }

  render() {
    const { repos } = this.props;
    return (
      <div>
        <h1>GitHub Nodejs repositories</h1>
        <ul>
          {
            buildStatus(repos.status)
          }
          {
            repos.data.map(this.buildRepo)
          }
        </ul>
      </div>
    );
  }
}

const { func, string } = PropTypes;

Feed.propTypes = {
  repos: stateFetchedArray.isRequired,
  issues: stateFetchedArray.isRequired,
  onRepoClick: func.isRequired,
  selectedRepo: string.isRequired,
};

export default Feed;
