import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import PublicationPage from './publications/PublicationPage.js';
import LandingPage from './landingPage/LandingPage.js';
import Header from './layout/Header.js';
import TeamPage from './teampage/TeamPage.js';

const App = () => {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/publication" component={PublicationPage} />
        <Route exact path="/team" component={TeamPage} />
      </Switch>
    </Fragment>
  );
};

export default App;
