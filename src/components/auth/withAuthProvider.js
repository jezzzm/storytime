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
          this.fetchUserData(authUser.uid)
        } else {
          this.setState({ authUser: false });
        }
      });
    }

    componentWillUnmount() {
      this.listener(); //prevent mem leak by forcing recheck
    }

    fetchUserData = (uid) => {
      this.props.firebase
        .getUserStories(uid)
        .then(snap => {
          const stories = {};
          snap.forEach(doc => {
            stories[doc.id] = doc.data();
          })
          this.props.firebase
            .user(uid)
            .get()
            .then(userDoc => {
              const username = userDoc.data().username
              this.setState({
                authUser: this.state.authUser,
                stories,
                username

              })
            })

        })
    }

    render() {
      return (
        <AuthContext.Provider value={{
            info: this.state.authUser,
            stories: this.state.stories,
            username: this.state.username,
            fetchUserData: this.fetchUserData
          }}
        >
          <InnerComponent {...this.props} />
        </AuthContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthProvider);
};

export default withAuthProvider;
