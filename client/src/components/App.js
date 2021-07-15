/**
 * Root component.
 */
import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Auth from './auth/Auth';
import Home from './home/Home';
import Dashboard from './dashboard/Dashboard';
import ProfileInfoEdit from './profileInfoEdit/ProfileInfoEdit';
import DeployPage from './deploy/DeployPage';

import Register from './auth/Register';
import Login from './auth/Login';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import { Container, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './layout/Layout.css';
import { ErrorToaster } from '../error/ErrorToaster';

import TeamPage from './teamPage/TeamPage';
import PublicationPage from './publications/PublicationPage';
import { Fragment } from 'react';
import { getTeamInfo } from '../actions/team';
const App = () => {
  const urls = {
    dashboard: '/dashboard',
    profile: '/dashboard/profile',
  };
  const teamId = useSelector((state) => state.team.teamId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeamInfo('60aa3a2fffa7020a52a4ca3d')); // test with this to avoid error: 60aa3a2fffa7020a52a4ca3d, FIXME: replace it with JWT token!!!
  }, [dispatch]);

  const errorMessage = useSelector((state) => state.main.error);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <BrowserRouter>
        <ErrorToaster message={errorMessage} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Fragment>
            <Header title={'Researchify'} urls={urls} />
            <Container fluid>
              <Row>
                <Col className="sidebar-wrapper" md={1} lg={1}>
                  <Sidebar />
                </Col>
                <Col className="page-content-wrapper" md={10} lg={10}>
                  <Route
                    path={`/publications/team/${teamId}`}
                    exact
                    component={PublicationPage}
                  />
                  <Route path={urls.dashboard} exact component={Dashboard} />
                  <Route
                    path={urls.profile}
                    exact
                    component={ProfileInfoEdit}
                  />
                  <Route path="/team" exact component={TeamPage} />
                  <Route path="/deploy" exact component={DeployPage} />
                </Col>
              </Row>
            </Container>
          </Fragment>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
