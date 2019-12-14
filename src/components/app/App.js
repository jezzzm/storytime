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
import Forgot from '../auth/Forgot';
import Create from '../Create';
import Account from '../Account';
import Help from '../Help';
import Story from '../Story';

const App = () => (
    <Router>
      <div>
        <Navigation />
        <hr />
        <Route exact path={ROUTES.CREATE} component={Create} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
        <Route path={ROUTES.FORGOT} component={Forgot} />
        <Route path={ROUTES.ACCOUNT} component={Account} />
        <Route path={ROUTES.STORY} component={Story} />
        <Route path={ROUTES.HELP} component={Help} />
      </div>
    </Router>

);



export default withAuthProvider(App);
