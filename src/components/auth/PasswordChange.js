import React, { Component } from 'react';

//styles
import styled from '@emotion/styled';
import * as S from '../../constants/style';
//context
import { withFirebase } from '../../firebase';

//components
import ButtonBlue from '../general/ButtonBlue';

const StyledInput = styled.input`
  padding: 1em;
  margin-right: 2em;
  border: 0;
  font-size: 1.1em;
  font-family: ${S.FANCY};
  background: rgba(255,255,255,0.8);
`;

const H2 = styled.h2`
  margin: 2em 0 1em;
`;

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
        <H2>Change My Password</H2>
        <StyledInput
          name="password"
          value={password}
          onChange={this._handleChange}
          type="password"
          placeholder="New Password"
          autoComplete="on"
        />
      <StyledInput
          name="passwordConf"
          value={passwordConf}
          onChange={this._handleChange}
          type="password"
          placeholder="Confirm New Password"
          autoComplete="on"
        />
      <ButtonBlue disabled={isInvalid} type="submit">
          Change Password
        </ButtonBlue>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
export default withFirebase(PasswordChange);
