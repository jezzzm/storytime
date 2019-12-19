import React, { Component } from 'react';

//routing
import { withRouter, Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

//context
import { withFirebase } from '../../firebase';

//components
import SpinnerBlue from '../general/SpinnerBlue';

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
  isLoggingIn: false
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  _handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.setState({isLoggingIn: true});
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => this.props.history.push(ROUTES.NEW))
      .catch(error => this.setState({ ...INITIAL_STATE, error }));
  };

  _handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password, error, isLoggingIn } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <form onSubmit={this._handleSubmit}>
        <input
          name="email"
          value={email}
          onChange={this._handleChange}
          type="email"
          placeholder="Email Address"
          autoComplete="on"
        />
        <input
          name="password"
          value={password}
          onChange={this._handleChange}
          type="password"
          placeholder="Password"
          autoComplete="on"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
        {error && <p>{error.message}</p>}
        {isLoggingIn && <SpinnerBlue />}
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
      .then( () => history.push(ROUTES.NEW))
      .catch(console.log)
  }

  return <p><button onClick={_handleGoogle}>Sign in with Google</button></p>;
};

export const GoogleSignIn = withRouter(withFirebase(GoogleSignInBase));

export const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignIn;
