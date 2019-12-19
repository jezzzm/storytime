import React from 'react';

//context
import { withAccess } from './auth/authContext';

//components
import PasswordChange from './auth/PasswordChange'

const Account = () => (
  <div>
    <h1>Account</h1>
    <PasswordChange />
  </div>
);

export default withAccess()(Account)
