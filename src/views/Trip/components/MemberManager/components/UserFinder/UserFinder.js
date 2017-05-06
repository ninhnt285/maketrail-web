import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';
import { Textfield, Button } from 'react-mdl';

import { extendClassName } from 'libs/component';
import UserImage from 'components/UserImage';

import styles from './UserFinder.scss';

class UserFinder extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired,
    onAddUser: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };

    this.oldQuery = '';
    this.loadingQuery = false;

    this.onQueryChange = this.onQueryChange.bind(this);
    this.sendQuery = this.sendQuery.bind(this);
    this.onAddUser = this.onAddUser.bind(this);
  }

  onAddUser(userId) {
    this.setState({ query: '' });
    this.oldQuery = '';
    this.props.onAddUser(userId);
  }

  onQueryChange(event) {
    this.setState(
      { query: event.target.value },
      this.sendQuery
    );
  }

  sendQuery() {
    const query = this.state.query;
    if (!this.loadingQuery && (query !== '') && (query !== this.oldQuery)) {
      const _that = this;
      this.loadingQuery = true;
      this.oldQuery = query;

      this.props.relay.setVariables(
        {
          query: this.state.query,
          searchUser: true
        },
        (readyState) => {
          if (readyState.done || readyState.aborted || readyState.error) {
            _that.loadingQuery = false;
            _that.forceUpdate();
            _that.sendQuery();
          }
        }
      );
    }
  }

  render() {
    let results = [];
    if ((this.props.viewer.searchUser) && this.state.query !== '') {
      results = this.props.viewer.searchUser.edges;
    }

    return (
      <div className={extendClassName(this.props, styles.root)}>
        <Textfield
          value={this.state.query}
          onChange={this.onQueryChange}
          label='Enter Username or Email...'
          floatingLabel
        />

        {(results.length > 0) &&
          <div className={styles.userResults}>
            {results.map(({ node: user }) =>
              <Button
                key={user.id}
                className={styles.userWrapper}
                onClick={this.onAddUser.bind(this, user.id)}
              >
                <UserImage className={styles.userImage} user={user} />
                <div className={styles.userDetail}>
                  <p className={styles.userName}>{user.fullName}</p>
                </div>
              </Button>
            )}
          </div>
        }
      </div>
    );
  }
}

export default Relay.createContainer(UserFinder, {
  initialVariables: {
    query: '',
    searchUser: false
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        searchUser(first: 10, query: $query) @include(if: $searchUser) {
          edges {
            node {
              id
              username
              fullName
              profilePicUrl
            }
          }
        }
      }
    `
  }
});
