import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';


import { withFirebase } from '../../firebase';
import * as ROUTES from '../../constants/routes';

const SignIn = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
    <ForgotLink />
    <GoogleSignIn />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.CREATE);
      })
      .catch(error => {

        this.setState({ ...INITIAL_STATE, error });
      });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="email"
          placeholder="Email Address"
          autoComplete="on"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
          autoComplete="on"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const ForgotLink = () => <p><Link to={ROUTES.FORGOT}>Forgot Password?</Link></p>;

const SignUpLink = () => <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>;

const GoogleSignInBase = ({ firebase, history }) => {
  const _handleGoogle = e => {
    e.preventDefault();
    firebase
      .doSignInWithGoogle()
      .then(_ => history.push(ROUTES.CREATE))
      .catch(console.log)
  }

  return <p><button onClick={_handleGoogle}>Sign in with Google</button></p>;
};

export const GoogleSignIn = withRouter(withFirebase(GoogleSignInBase));

export const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignIn;
