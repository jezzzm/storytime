import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../../firebase';
import { GoogleSignIn } from './SignIn';
import * as ROUTES from '../../constants/routes'



const SignUp = () => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm />
    <GoogleSignIn />
    <SignInLink />
  </div>
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
      .then( () => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.CREATE) //redirect to draw page
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
      <form onSubmit={this._handleSubmit}>
        <input
            name="username"
            value={username}
            onChange={this._handleChange}
            type="text"
            placeholder="Username"
            autoComplete="on"
          />
          <input
            name="email"
            value={email}
            onChange={this._handleChange}
            type="text"
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
          <input
            name="passwordConf"
            value={passwordConf}
            onChange={this._handleChange}
            type="password"
            placeholder="Confirm Password"
            autoComplete="on"
          />
        <button type="submit" disabled={isInvalid}>Sign Up</button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInLink = () => <p>Already have an account? <Link to="/signin">Sign In</Link></p>;

const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUp;
export { SignUpForm };
