import React from 'react';
import { Footer as MDLFooter, FooterSection, FooterLinkList } from 'react-mdl';
import { Link } from 'react-router';
import styles from './Footer.scss';

export default class Footer extends React.Component {
  render() {
    return (
      <MDLFooter className={styles.root} size='mini'>
        <FooterSection type='middle'>
          <FooterLinkList>
            <Link to='/'>Home</Link>
            <Link to='/idea'>Idea</Link>
            <Link to='/about'>About</Link>
            <Link to='/legal'>Legal</Link>
          </FooterLinkList>
        </FooterSection>

        <FooterSection type='bottom' style={{ width: '100%' }}>
          <p style={{ textAlign: 'center', margin: '0' }}>© Copyright 2017, LineSol, Inc. All rights reserved.</p>
        </FooterSection>
      </MDLFooter>
    );
  }
}
