import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import Routes from './routes/Route';

import { SERVER_URL } from './config';
import '../node_modules/react-mdl/extra/material';

const token = localStorage.getItem('accessToken');
Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(SERVER_URL, {
    headers: {
      Authorization: `${token}`
    },
  })
);

const rootNode = document.createElement('div');
document.body.appendChild(rootNode);

ReactDOM.render(
  <Router
    environment={Relay.Store}
    render={applyRouterMiddleware(useRelay)}
    history={browserHistory}
    routes={Routes}
  />,
  rootNode
);
