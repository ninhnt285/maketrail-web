import React from 'react';
import { Link } from 'react-router';
import { Drawer as MDLDrawer } from 'react-mdl';
import Navigation from '../Navigation/NavigationComponent';

export default class DrawerComponent extends React.Component {
  render() {
    return (
      <MDLDrawer title={<Link to='/' style={{ fontSize: '1.5em' }}>LineSol</Link>}>
        <Navigation {...this.props} />
      </MDLDrawer>
    );
  }
}
