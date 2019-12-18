import React, { Component } from 'react';
import AuthContext from './authContext';
import { withFirebase } from '../../firebase';

const withAuthProvider = InnerComponent => {
  class WithAuthProvider extends Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if(authUser) {
          this.props.firebase
            .getUserStories(authUser.uid)
            .then(snap => {
              const userStories = {};
              snap.forEach(doc => {
                userStories[doc.id] = doc.data();
              })
              this.setState({
                authUser: {...authUser,
                userStories}
              })
            })

          // this.setState({ authUser })
        } else {
          this.setState({ authUser: false });
        }
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
