import React, { Fragment } from 'react';


//styles
import styled from '@emotion/styled';

//context
import { withAuth } from './authContext';

//Components
import SpinnerBlue from '../general/SpinnerBlue';

const StyledText = styled.p`
  font-size: 1.1em;
  padding: 0.5em 0;
  strong {
    color: rgba(255,255,255,0.7);
  }
`;

const MyDetails = props => {
  const authStatus = props.authUser.stories && props.authUser.info;
  let email;
  let count;
  let username;

  if (authStatus) {
    username = props.authUser.username;
    email = props.authUser.info.email;
    count = Object.keys(props.authUser.stories).length;
  }

  return (
    <section>
      <h2>My Details</h2>
      {authStatus ? (
        <Fragment>
          <StyledText><strong>Username:</strong> {username}</StyledText>
          <StyledText><strong>Email:</strong> {email}</StyledText>
          <StyledText><strong>Stories:</strong> {count}</StyledText>
        </Fragment>
      ) : (
        <SpinnerBlue />
      )}
    </section>
  )
}


export default withAuth(MyDetails)
