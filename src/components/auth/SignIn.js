import React, { Component } from 'react';

//routing
import { withRouter, Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

//context
import { withFirebase } from '../../firebase';

//components
import SpinnerBlue from '../general/SpinnerBlue';
import Container from '../general/Container';
import InputGeneral from '../general/InputGeneral'
import ButtonBlue from '../general/ButtonBlue';
import ButtonSubmit from '../general/ButtonSubmit';
import AuthLink from '../general/AuthLink';

const SignIn = () => (
  <Container>
    <h1>Sign In</h1>
    <SignInForm />
    <ForgotLink />
    <GoogleSignIn />
    <SignUpLink />
  </Container>
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
        <InputGeneral
          name="email"
          value={email}
          onChange={this._handleChange}
          type="email"
          placeholder="Email Address"
          autoComplete="on"
        />
      <InputGeneral
          name="password"
          value={password}
          onChange={this._handleChange}
          type="password"
          placeholder="Password"
          autoComplete="on"
        />
        <ButtonSubmit disabled={isInvalid} type="submit">
          Sign In
        </ButtonSubmit>
        {error && <p>{error.message}</p>}
        {isLoggingIn && <SpinnerBlue />}
      </form>
    );
  }
}

const ForgotLink = () => <p><AuthLink to={ROUTES.FORGOT}>Forgot Password?</AuthLink></p>;

const SignUpLink = () => <p>Don't have an account? <AuthLink to="/signup">Create one!</AuthLink></p>;

const GoogleSignInBase = ({ firebase, history }) => {
  const _handleGoogle = e => {
    e.preventDefault();
    firebase
      .doSignInWithGoogle()
      .then( () => history.push(ROUTES.NEW))
      .catch(console.log)
  }

  return <p><ButtonBlue to="#" onClick={_handleGoogle}>Sign in with Google</ButtonBlue></p>;
};

export const GoogleSignIn = withRouter(withFirebase(GoogleSignInBase));

export const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignIn;
