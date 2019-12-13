import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../../firebase';
import * as ROUTES from '../../constants/routes'



const SignUp = () => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm />
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
  onSubmit = e => {
    e.preventDefault();

    const { username, email, password } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then( _ => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.CREATE) //redirect to draw page
      })
      .catch(error => this.setState({ error }));
  };

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  };

  render() {
    const {username, email, password, passwordConf, error } = this.state;

    const isInvalid =
      password !== passwordConf ||
      password === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
          />
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <input
            name="passwordConf"
            value={passwordConf}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
        <button type="submit" disabled={isInvalid}>Sign Up</button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
const SignUpLink = () => (
  <div>
    <p>
      Don't have an account? Sign Up
    </p>
    <p>
      Sign in with Google
    </p>
  </div>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUp;
export { SignUpForm, SignUpLink };
