import React, { Fragment } from 'react';

//routing
import * as ROUTES from '../constants/routes';

//styles
import styled from '@emotion/styled';
import * as S from '../constants/style';

//components
import Container from './general/Container';
import Logo from './general/Logo';
import Heading from './general/Heading';
import ButtonGreen from './general/ButtonGreen';
import ButtonBlue from './general/ButtonBlue';
import * as Icons from './general/Icons';
import SpinnerBlue from './general/SpinnerBlue'

//context
import { withAuth } from './auth/authContext';

const StyledContainer = styled(Container)`
  text-align: center;
  margin-top: 2em;
  color: ${S.COPY};
  .left {
    margin-right: 1em;
  }
  .right {
    margin-left: 1em;
  }
  .logo {
    font-size: 6em;
  }
  .its {
    margin-bottom: 0;
    font-size: 2.5em;
  }
  div {
    margin-bottom: 3em;
  }
  p, a {
    font-size: 1.2em;
  }

  svg {
    width: 40px;
    margin: 2em 0 0;
    path {
      fill: rgba(255,255,255,0.8);
    }
  }
`;

const Landing = props => {
  const authStatus = props.authUser.info;
  return (
    <StyledContainer>
      <Heading className="its">it's</Heading>
      <Logo to="#" className="logo"/>
      <div>
        <Icons.Palette />
        <p>Writing prompts courtesy of the Google Quick, Draw! dataset.</p>
        <Icons.Pencil />
        <p>50 million+ drawings, randomly given to you to write your own digital picture book.</p>
        <Icons.Draw />
        <p>Manipulate the drawings to create wacky shapes!</p>
      </div>
      {authStatus === null ? (
        <SpinnerBlue />
      ) : !authStatus && (
        <Fragment>
          <ButtonBlue to={ROUTES.SIGN_IN} className="left">Sign In</ButtonBlue>
          <ButtonGreen to={ROUTES.SIGN_UP} className="right">Create Account</ButtonGreen>
        </Fragment>
      )}
    </StyledContainer>
  );
}

export default withAuth(Landing);
