import React, { Component } from 'react';
import { withFirebase } from '../../firebase';

const INITIAL_STATE = {
  password: '',
  passwordConf: '',
  error: null,
};

class PasswordChange extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  _handleSubmit = e => {
    e.preventDefault();
    const { password } = this.state;
    this.props.firebase
      .doPasswordUpdate(password)
      .then( _ => this.setState({ ...INITIAL_STATE }))
      .catch(error => this.setState({ error }));
  };

  _handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { password, passwordConf, error } = this.state;
    const isInvalid = password !== passwordConf || password === '';

    return (
      <form onSubmit={this._handleSubmit}>
        <h2>Change My Password</h2>
        <input
          name="password"
          value={password}
          onChange={this._handleChange}
          type="password"
          placeholder="New Password"
          autoComplete="on"
        />
        <input
          name="passwordConf"
          value={passwordConf}
          onChange={this._handleChange}
          type="password"
          placeholder="Confirm New Password"
          autoComplete="on"
        />
        <button disabled={isInvalid} type="submit">
          Reset Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
export default withFirebase(PasswordChange);
