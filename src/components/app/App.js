import React from 'react';

//Routing
import { HashRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import styled from '@emotion/styled';

//context
import withAuthProvider from '../auth/withAuthProvider';
import withCreationProvider from '../create/withCreationProvider';

//Components
import Navigation from './Navigation';
import SignUp from '../auth/SignUp';
import SignIn from '../auth/SignIn';
import PasswordForgot from '../auth/PasswordForgot';
import PasswordChange from '../auth/PasswordChange';
import Create from '../create/Create';
import Creations from '../Creations'
import Account from '../Account';
import Help from '../Help';
import Story from '../Story';

const Container = styled.div`
  margin: 3em auto;
  padding: 2em;
  max-width: calc(100vw - 4em);
`;

const App = () => (
  <Router>
    <Navigation />
    <Container>
      <Route exact path={ROUTES.CREATE} component={Create} />
      <Route path={ROUTES.SIGN_UP} component={SignUp} />
      <Route path={ROUTES.SIGN_IN} component={SignIn} />
      <Route path={ROUTES.FORGOT} component={PasswordForgot} />
      <Route path={ROUTES.CHANGE} component={PasswordChange} />
      <Route path={ROUTES.ACCOUNT} component={Account} />
      <Route path={ROUTES.CREATIONS} component={Creations} />
      <Route path={ROUTES.STORY} component={Story} />
      <Route path={ROUTES.HELP} component={Help} />
    </Container>
  </Router>
);



export default withAuthProvider(withCreationProvider(App));
