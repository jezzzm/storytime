import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withAuth } from '../auth/context';
import styled from '@emotion/styled'
import { withFirebase } from '../../firebase';


const Nav = styled.nav`
  background: black;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 1em;
`;
const StyledLink = styled(Link)`
  color: white
`;

const Button = styled.button`
  background: white;
  padding: 0.5em;
  border: 1px solid #ccc;
  border-radius: 0.2em;
`;

const Navigation = props => (
  <Nav>
    <div>
      <StyledLink to={ROUTES.CREATE}>Create</StyledLink>
      <StyledLink to={ROUTES.HELP}>Help</StyledLink>
    </div>
    <div>
      {props.authUser ?
        <UserAuthed />
        :
        <UserNotAuthed />
      }
    </div>
  </Nav>
);

const UserAuthed = () => (
  <Fragment>
    <StyledLink to={ROUTES.CREATIONS}>Creations</StyledLink>
    <StyledLink to={ROUTES.ACCOUNT}>Account</StyledLink>
    <SignOut />
  </Fragment>
);

const UserNotAuthed = () => (
  <Fragment>
    <StyledLink to={ROUTES.SIGN_IN}>Sign In</StyledLink>
    <StyledLink to={ROUTES.SIGN_UP}>Sign Up</StyledLink>
  </Fragment>
);

const SignOutButton = ({ firebase }) => (
  <Button type="button" onClick={firebase.doSignOut}>
    Sign Out
  </Button>
);

export const SignOut = withFirebase(SignOutButton);

export default withAuth(Navigation);
