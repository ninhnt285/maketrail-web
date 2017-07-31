import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import ViewerQuery from 'routes/ViewerQuery';
import AppContainer from 'views/App/AppContainer';
import HomeContainer from 'views/Home/HomeContainer';
import LoginComponent from 'views/Login/LoginComponent';
import RegisterComponent from 'views/Register/RegisterComponent';
import TripsContainer from 'views/Trips/TripsContainer';
import TripContainer from 'views/Trip/TripContainer';
import FeedContainer from 'views/Feed/FeedContainer';
import AttachmentContainer from 'views/Attachment/AttachmentContainer';
import SettingContainer from 'views/Setting/SettingContainer';
import ProfileContainer from 'views/Profile/ProfileContainer';
import PhotosContainer from 'views/Photos/PhotosContainer';
import ExploreContainer from 'views/Explore/ExploreContainer';
import CityContainer from 'views/City/CityContainer';
import LocationContainer from 'views/Location/LocationContainer';
import PasswordRequest from 'views/Password/views/Request';
import PasswordReset from 'views/Password/views/Reset';

export default (
  <Route path='/' component={AppContainer} queries={ViewerQuery}>
    <IndexRoute component={HomeContainer} queries={ViewerQuery} />
    <Route path='/login' component={LoginComponent} />
    <Route path='/register' component={RegisterComponent} />
    <Route path='/password/request' component={PasswordRequest} />
    <Route path='/password/reset/:token' component={PasswordReset} />
    <Route path='/explore' component={ExploreContainer} queries={ViewerQuery} />
    <Route path='/city/:cityId' component={CityContainer} queries={ViewerQuery} />
    <Route path='/location/:locationId' component={LocationContainer} queries={ViewerQuery} />
    <Route path='/trips' component={TripsContainer} queries={ViewerQuery} />
    <Route path='/setting' component={SettingContainer} queries={ViewerQuery} />
    <Route path='/trip/:tripId' component={TripContainer} queries={ViewerQuery} />
    <Route path='/feed/:feedId' component={FeedContainer} queries={ViewerQuery} />
    <Route path='/post/:feedId' component={FeedContainer} queries={ViewerQuery} />
    <Route path='/photo/:attachmentId' component={AttachmentContainer} queries={ViewerQuery} />
    <Route path='/video/:attachmentId' component={AttachmentContainer} queries={ViewerQuery} />
    <Route path='/profile/:userId' component={ProfileContainer} queries={ViewerQuery} />
    <Route path='/profile/:userId/photos' component={PhotosContainer} queries={ViewerQuery} />
    <Redirect from='*' to='/' />
  </Route>
);
