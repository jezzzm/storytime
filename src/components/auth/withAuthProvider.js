import React, { Component } from 'react';
import AuthContext from './context';
import { withFirebase } from '../../firebase';

const withAuthProvider = InnerComponent => {
  class WithAuthProvider extends Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        authUser ? this.setState({ authUser }) : this.setState({ authUser: null });
      });
    }

    componentWillUnmount() {
      this.listener(); //prevent mem leak by forcing recheck
    }

    render() {
      return (
        <AuthContext.Provider value={this.state.authUser}>
          <InnerComponent {...this.props} />
        </AuthContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthProvider);
};

export default withAuthProvider;
