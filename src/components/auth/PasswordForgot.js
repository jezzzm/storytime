import React, { Component } from 'react';
import { withFirebase } from '../../firebase';

const PasswordForgot = () => (
  <div>
    <h1>Forgot your password?</h1>
    <ForgotForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class ForgotFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  _handleSubmit = e => {
    e.preventDefault();
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then( () => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  _handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, error } = this.state;
    const isInvalid = email === '';

    return (
      <form onSubmit={this._handleSubmit}>
        <input
          name="email"
          value={this.state.email}
          onChange={this._handleChange}
          type="text"
          placeholder="Email Address"
          autoComplete="on"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default PasswordForgot;
export const ForgotForm = withFirebase(ForgotFormBase);
