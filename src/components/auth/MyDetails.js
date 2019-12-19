import React, { Fragment } from 'react';

//context
import { withAuth } from './authContext';

//Components
import SpinnerBlue from '../general/SpinnerBlue';

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
          <p><strong>Username:</strong> {username}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Stories:</strong> {count}</p>
        </Fragment>
      ) : (
        <SpinnerBlue />
      )}
    </section>
  )
}


export default withAuth(MyDetails)
