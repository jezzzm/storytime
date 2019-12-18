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
          this.setState({authUser})
          this.fetchStories(authUser.uid)
        } else {
          this.setState({ authUser: false });
        }
      });
    }

    componentWillUnmount() {
      this.listener(); //prevent mem leak by forcing recheck
    }

    fetchStories = (uid) => {
      this.props.firebase
        .getUserStories(this.state.authUser.uid)
        .then(snap => {
          const stories = {};
          snap.forEach(doc => {
            stories[doc.id] = doc.data();
          })
          this.setState({
            authUser: {
              ...this.state.authUser,
              stories
            }
          })
        })
    }

    render() {
      return (
        <AuthContext.Provider value={{...this.state.authUser, fetchStories: this.fetchStories}}>
          <InnerComponent {...this.props} />
        </AuthContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthProvider);
};

export default withAuthProvider;
