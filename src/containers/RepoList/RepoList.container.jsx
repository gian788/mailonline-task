import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getRepos from '../../actions/repos';
import getIssues from '../../actions/issues';
import RepoList from '../../components/RepoList/RepoList';
import { stateFetchedArray } from '../../utils/types';

export class RepoListContainer extends React.Component {
  constructor() {
    super();
    this.onRepoClick = this.onRepoClick.bind(this);
    this.state = {
      selectedRepo: '',
    };
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.getRepos();
  }

  onRepoClick(selectedRepo) {
    const { actions } = this.props;
    this.setState({ selectedRepo });
    actions.getIssues(selectedRepo);
  }

  render() {
    const { repos, issues } = this.props;
    const { selectedRepo } = this.state;
    return (
      <RepoList
        repos={repos}
        issues={issues}
        selectedRepo={selectedRepo}
        onRepoClick={this.onRepoClick}
      />
    );
  }
}

const { func, shape } = PropTypes;

RepoListContainer.propTypes = {
  actions: shape({
    getRepos: func.isRequired,
    getIssues: func.isRequired,
  }).isRequired,
  repos: stateFetchedArray.isRequired,
  issues: stateFetchedArray.isRequired,
};


function mapStateToProps(state) {
  return {
    repos: state.repos,
    issues: state.issues,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    getRepos,
    getIssues,
  };
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RepoListContainer);
