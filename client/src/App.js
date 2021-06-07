import React from 'react';

import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import { Container } from '@material-ui/core';
import { Navbar, Home,Auth } from './components';
const App = () => {
 

  return (
    <Router>
    <Container maxWidth="lg">
      <Navbar/>
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth}/>
          </Switch>
      </Container>
      </Router>
  );
};

export default App;
