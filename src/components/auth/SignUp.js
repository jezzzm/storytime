import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../../firebase';
import { GoogleSignIn } from './SignIn';
import * as ROUTES from '../../constants/routes'

import Container from '../general/Container';
import InputGeneral from '../general/InputGeneral'
import ButtonGreen from '../general/ButtonGreen';
import ButtonBlue from '../general/ButtonBlue';
import AuthLink from '../general/AuthLink';

const SignUp = () => (
  <Container>
    <h1>Create Account</h1>
    <SignUpForm />
    <GoogleSignIn />
    <SignInLink />
  </Container>
);



const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  passwordConf: '',
  error: null
}

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  _handleSubmit = e => {
    e.preventDefault();

    const { username, email, password } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      .then( () => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.NEW) //redirect to draw page
      })
      .catch(error => this.setState({ error }));
  };

  _handleChange = e => this.setState({[e.target.name]: e.target.value});

  render() {
    const {username, email, password, passwordConf, error } = this.state;

    const isInvalid =
      password !== passwordConf ||
      password === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this._handleSubmit} style={{margin: '2em 0'}} >
        <InputGeneral
            style={{display: 'block', margin: '1em 0'}}
            name="username"
            value={username}
            onChange={this._handleChange}
            type="text"
            placeholder="Username"
            autoComplete="on"
          />
        <InputGeneral
            style={{display: 'block', margin: '1em 0'}}
            name="email"
            value={email}
            onChange={this._handleChange}
            type="text"
            placeholder="Email Address"
            autoComplete="on"
          />
        <InputGeneral
            style={{display: 'block', margin: '1em 0'}}
            name="password"
            value={password}
            onChange={this._handleChange}
            type="password"
            placeholder="Password"
            autoComplete="on"
          />
        <InputGeneral
            style={{display: 'block', margin: '1em 0'}}
            name="passwordConf"
            value={passwordConf}
            onChange={this._handleChange}
            type="password"
            placeholder="Confirm Password"
            autoComplete="on"
          />
        <button type="submit" disabled={isInvalid}>Create</button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInLink = () => <p>Already have an account? <AuthLink to="/signin">Sign In</AuthLink></p>;

const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUp;
export { SignUpForm };
