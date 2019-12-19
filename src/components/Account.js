import React from 'react';

//context
import { withAccess} from './auth/authContext';

//components
import PasswordChange from './auth/PasswordChange';
import Container from './general/Container';
import Heading from './general/Heading';
import MyDetails from './auth/MyDetails';

const Account = () => (
  <Container>
    <Heading>My Account</Heading>
    <MyDetails />
    <PasswordChange />
  </Container>
);

export default withAccess()(Account);
