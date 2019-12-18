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

//components
import OrangeSpinner from './OrangeSpinner';

const Nav = styled.nav`
  background: linear-gradient(90deg, ${S.M_BLUE}, ${S.D_BLUE});
  box-shadow: ${S.L_SHADOW_D};
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 1.5em;
  font-family: ${S.FANCY};
  a {
    text-decoration: none;
    transition: 0.2s box-shadow;
    color: white;
  }
  a.new {
    background: ${S.GREEN};
    margin-right: 1em;
  }
  a.auth {
    background: ${S.L_BLUE};
    margin-left: 1em;
  }
  a.btn {
    padding: 0.5em 1.5em;
    box-shadow: ${S.S_SHADOW};
    border-radius: 0.2em;
    color: ${S.COPY};
    &:hover {
      box-shadow: ${S.S_SHADOW_H}
    }
  }
`;

const StyledLink = styled(Link)`
  margin-right: 1em;
  &:hover {
    text-decoration: underline;
  }
`;

const Navigation = props => {

  return (
    <Nav>
      <div>
        <StyledLink to={ROUTES.LANDING}>Home</StyledLink>
        <Link to={ROUTES.NEW} className="btn new">New Story</Link>
        <StyledLink to={ROUTES.HELP}>Help</StyledLink>
      </div>
      <div>
        {props.authUser.info ?
          <UserAuthed />
          :
          (props.authUser.info === null ? (
            <OrangeSpinner />
          ): (
            <UserNotAuthed />
          ))
        }
      </div>
    </Nav>
  );
}


const UserAuthed = () => (
  <Fragment>
    <StyledLink to={ROUTES.STORIES}>My Stories</StyledLink>
    <StyledLink to={ROUTES.ACCOUNT}>Account</StyledLink>
    <SignOut />
  </Fragment>
);

const UserNotAuthed = () => (
  <Fragment>
    <Link to={ROUTES.SIGN_IN} className="btn auth">Sign In</Link>
    <Link to={ROUTES.SIGN_UP} className="btn auth">Sign Up</Link>
  </Fragment>
);

const SignOutButton = ({ firebase, creation }) => {
  const _handleSignOut = () => {
    console.log('clicked')
    firebase.doSignOut();
    creation.clearCreation();
  }

  return (
    <Link to="#" onClick={_handleSignOut} className="btn auth">
      Sign Out
    </Link>
  );
}

export const SignOut = withFirebase(withCreation(SignOutButton));

export default withAuth(Navigation);
