import React from 'react';

//Routing
import { HashRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

//context
import withAuthProvider from '../auth/withAuthProvider';
import withCreationProvider from '../create/withCreationProvider';

//styles
import styled from '@emotion/styled';
import * as S from '../../constants/style';

//Components
import Navigation from './Navigation';
import SignUp from '../auth/SignUp';
import SignIn from '../auth/SignIn';
import PasswordForgot from '../auth/PasswordForgot';
import PasswordChange from '../auth/PasswordChange';
import New from '../create/Create';
import Stories from '../Stories'
import Account from '../Account';
import Help from '../Help';
import Story from '../Story';
import Edit from '../Edit';
import Landing from '../Landing';

const StyledContainer = styled.div`
  min-height: 100vh;
  background-image: radial-gradient(circle, ${S.L_OJ} 0%, ${S.M_OJ} 70%, ${S.D_OJ} 100%);
  display: flex;
  flex-direction: column;
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const App = props =>  {
  console.log(props);
  return (
    <Router>
      <StyledContainer>
        <Navigation />
        <StyledMain>
          <Route exact path={ROUTES.NEW} component={New} />
          <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
          <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
          <Route exact path={ROUTES.FORGOT} component={PasswordForgot} />
          <Route exact path={ROUTES.CHANGE} component={PasswordChange} />
          <Route exact path={ROUTES.ACCOUNT} component={Account} />
          <Route exact path={ROUTES.STORIES} component={Stories} />
          <Route exact path={ROUTES.STORY} component={Story} />
          <Route exact path={ROUTES.EDIT} component={Edit} />

          <Route exact path={ROUTES.HELP} component={Help} />
          <Route exact path={ROUTES.LANDING} component={Landing} />
        </StyledMain>
      </StyledContainer>
    </Router>
  );
}



export default withAuthProvider(withCreationProvider(App));
