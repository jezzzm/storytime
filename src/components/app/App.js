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

const StyledContainer = styled.div`
  min-height: 100vh;
  background-image: radial-gradient(circle, #F9A72B 0%, #FA9026 70%, #FB6C1F 100%);
  display: flex;
  flex-direction: column;
`;

const StyledMain = styled.main`
  /* margin: 2em auto 0; */
  padding: 1.5em;
  /* max-width: calc(100vw - 4em); */
  /* min-height: 100%; */
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const App = () => (
  <Router>
    <StyledContainer>
      <Navigation />
      <StyledMain>
        <Route exact path={ROUTES.CREATE} component={Create} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
        <Route path={ROUTES.FORGOT} component={PasswordForgot} />
        <Route path={ROUTES.CHANGE} component={PasswordChange} />
        <Route path={ROUTES.ACCOUNT} component={Account} />
        <Route path={ROUTES.CREATIONS} component={Creations} />
        <Route path={ROUTES.STORY} component={Story} />
        <Route path={ROUTES.HELP} component={Help} />
      </StyledMain>
    </StyledContainer>
  </Router>
);



export default withAuthProvider(withCreationProvider(App));
