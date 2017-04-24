import React, { Component } from 'react';
import Relay from 'react-relay';
import PropTypes from 'prop-types';

class TestComponent extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  };

  static defaultProps = {
    viewer: {
      id: 'viewer-fixed',
      searchLocality: { edges: [] }
    }
  }

  render() {
    return (
      <div>
        {this.props.viewer.id}
        {this.props.viewer.searchLocality.edges.map(edge =>
          <div key={edge.node.__dataID__}>
            {edge.node.name}
          </div>
        )}
      </div>
    );
  }
}

export default Relay.createContainer(TestComponent, {
  initialVariables: {
    query: ''
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
        searchLocality(query: $query, first: 10) {
          edges {
            node {
              name
            }
          }
        }
      }
    `
  }
});
