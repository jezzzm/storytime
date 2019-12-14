import React from 'react';

//Routing
import { HashRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

//context
import withAuthProvider from '../auth/withAuthProvider';

//Components
import Navigation from './Navigation';
import SignUp from '../auth/SignUp';
import SignIn from '../auth/SignIn';
import PasswordForgot from '../auth/PasswordForgot';
import PasswordChange from '../auth/PasswordChange';
import Create from '../Create';
import Creations from '../Creations'
import Account from '../Account';
import Help from '../Help';
import Story from '../Story';

const App = () => (
    <Router>
      <div>
        <Navigation />
        <Route exact path={ROUTES.CREATE} component={Create} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
        <Route path={ROUTES.FORGOT} component={PasswordForgot} />
        <Route path={ROUTES.CHANGE} component={PasswordChange} />
        <Route path={ROUTES.ACCOUNT} component={Account} />
        <Route path={ROUTES.CREATIONS} component={Creations} />
        <Route path={ROUTES.STORY} component={Story} />
        <Route path={ROUTES.HELP} component={Help} />
      </div>
    </Router>

);



export default withAuthProvider(App);
