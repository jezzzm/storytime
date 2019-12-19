import React, { Fragment } from 'react';

//routing
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

//styles
import styled from '@emotion/styled';
import * as S from '../../constants/style';

//context
import { withFirebase } from '../../firebase';
import { withCreation } from '../create/CreationContext';
import { withAuth } from '../auth/authContext';
import { withRouter } from 'react-router';

//components
import SpinnerOrange from '../general/SpinnerOrange';
import ButtonGreen from '../general/ButtonGreen';
import ButtonBlue from '../general/ButtonBlue';
import Logo from '../general/Logo';

const Nav = styled.nav`
  background: linear-gradient(90deg, ${S.M_BLUE}, ${S.D_BLUE});
  box-shadow: ${S.L_SHADOW_D};
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 1em 1.5em;
  .left {
    margin-right: 1em;
  }
  .right {
    margin-left: 1em;
  }
`;

const StyledLink = styled(Link)`
  margin-right: 1em;
  color: white;
  text-decoration:none;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledSection = styled.div`
  display: flex;
  align-items:center;

`;

const Navigation = props => {
  const authStatus = props.authUser.info;
  return (
    <Nav>
      <StyledSection>
        <Logo to={ROUTES.LANDING} className="left" />
        <ButtonGreen to={ROUTES.NEW} className="left">New Story</ButtonGreen>
        <StyledLink to={ROUTES.HELP}>Help</StyledLink>
      </StyledSection>
      <StyledSection>
        {authStatus ?
          <UserAuthed />
          :
          (authStatus === null ? (
            <SpinnerOrange />
          ): (
            <UserNotAuthed />
          ))
        }
      </StyledSection>
    </Nav>
  );
}


const UserAuthed = () => (
  <Fragment>
    <StyledLink to={ROUTES.STORIES}>My Stories</StyledLink>
    <StyledLink to={ROUTES.ACCOUNT}>My Account</StyledLink>
    <SignOut />
  </Fragment>
);

const UserNotAuthed = () => (
  <Fragment>
    <ButtonBlue to={ROUTES.SIGN_IN} className="right">Sign In</ButtonBlue>
    <ButtonGreen to={ROUTES.SIGN_UP} className="right">Create Account</ButtonGreen>
  </Fragment>
);

const SignOutButton = ({ history, firebase, creation }) => {
  const _handleSignOut = () => {
    firebase.doSignOut();
    creation.clearCreation();
    history.push(ROUTES.LANDING)
  }

  return (
    <ButtonBlue to="#" onClick={_handleSignOut} className="right">
      Sign Out
    </ButtonBlue>
  );
}

export const SignOut = withFirebase(withCreation(withRouter(SignOutButton)));

export default withAuth(Navigation);
