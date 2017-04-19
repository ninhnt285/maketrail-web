import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import ViewerQuery from './ViewerQuery';
import AppContainer from '../components/App/AppContainer';
import HomeContainer from '../components/Home/HomeContainer';
import LoginComponent from '../components/Login/LoginComponent';
import RegisterComponent from '../components/Register/RegisterComponent';

export default (
  <Route path='/' component={AppContainer} queries={ViewerQuery}>
    <IndexRoute component={HomeContainer} queries={ViewerQuery} />
    <Route path='/login' component={LoginComponent} />
    <Route path='/register' component={RegisterComponent} />
    <Redirect from='*' to='/' />
  </Route>
);
