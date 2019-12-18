import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withAuth } from '../auth/authContext';
import styled from '@emotion/styled'
import { withFirebase } from '../../firebase';
import { withCreation } from '../create/CreationContext';

import OrangeSpinner from './OrangeSpinner';

const Nav = styled.nav`
  background: linear-gradient(90deg, #94c8fd,#2690FA);
  box-shadow: 0 10px 10px rgba(0,0,0,0.1);
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 1.5em;
  font-family: 'Pangolin', sans-serif;
  a {
    text-decoration: none;
    transition: 0.2s box-shadow;
  }
`;
const StyledLink = styled(Link)`
  color: white;
  margin-right: 1em;
  &:hover {
    text-decoration: underline;
  }
`;

const ButtonLink = styled(Link)`
  background: rgba(255,255,255,0.8);
  padding: 0.5em 1.5em;
  box-shadow: 2px 2px 2px rgba(0,0,0,0.5);
  border-radius: 0.2em;
  margin-left: 1em;
  color: #222;
  &:hover {
    box-shadow: 2px 2px 2px rgba(0,0,0,0.2)
  }
`;

const CreateButton = styled(Link)`
  background: #C8FD94;
  color: #222;
  padding: 0.5em 1.5em;
  border-radius: 0.2em;
  margin-right: 1em;
  box-shadow: 2px 2px 2px rgba(0,0,0,0.5);
  &:hover {
    box-shadow: 2px 2px 2px rgba(0,0,0,0.2)
  }

`;

const Navigation = props => (
  <Nav>
    <div>
      <CreateButton to={ROUTES.CREATE}>Create</CreateButton>
      <StyledLink to={ROUTES.HELP}>Help</StyledLink>
    </div>
    <div>
      {props.authUser ?
        <UserAuthed />
        :
        (props.authUser === null ? (
          <OrangeSpinner />
        ): (
          <UserNotAuthed />
        ))
      }
    </div>
  </Nav>
);


const UserAuthed = () => (
  <Fragment>
    <StyledLink to={ROUTES.STORIES}>Stories</StyledLink>
    <StyledLink to={ROUTES.ACCOUNT}>Account</StyledLink>
    <SignOut />
  </Fragment>
);

const UserNotAuthed = () => (
  <Fragment>
    <ButtonLink to={ROUTES.SIGN_IN}>Sign In</ButtonLink>
    <ButtonLink to={ROUTES.SIGN_UP}>Sign Up</ButtonLink>
  </Fragment>
);

const SignOutButton = ({ firebase, creation }) => {
  const _handleSignOut = () => {
    firebase.doSignOut();
    creation.clearPages();
  }

  return (
    <ButtonLink to="#" onClick={_handleSignOut}>
      Sign Out
    </ButtonLink>
  );
}

export const SignOut = withFirebase(withCreation(SignOutButton));

export default withAuth(Navigation);
