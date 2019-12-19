import React, { Component } from 'react';

//routes
import * as ROUTES from '../../constants/routes';
import { withRouter } from 'react-router-dom';

//context
import { withFirebase } from '../../firebase';

const AuthContext = React.createContext(null);
export default AuthContext;

export const withAuth = InnerComponent => props =>  (
  <AuthContext.Consumer>
    {user => <InnerComponent {...props} authUser={user} />}
  </AuthContext.Consumer>
);

export const withAccess = () => InnerComponent => {
  class WithAccess extends Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (!this.props.firebase.authedUser(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return <InnerComponent {...this.props} />;
    }
  }
  return withRouter(withFirebase(WithAccess));
};
