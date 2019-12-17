import React, { Component } from 'react';
import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';

const StyledInput = styled(TextareaAutosize)`
  background: rgba(255,255,255,0.1  );
  width: 100%;
  border: 5px solid transparent;
  font-size: 2rem;
  color: #222;
  padding: 1em;
  border-radius: 1em;
  resize: none;
  font-family: 'Caveat Brush', sans-serif;
  box-shadow: 0 0 30px rgba(0,0,0,0.2);
  transition: 0.3s box-shadow, background;
  &:focus {
    outline: none;
    box-shadow: 0 0 30px rgba(255,255,255,1);
    background: rgba(255,255,255,0.05  );
  }
  &:hover {
    background: rgba(255,255,255,0.05  );
  }
`;

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
`;

const StyledButton = styled.button`
  background: #069a27;
  border: 0;
  border-radius: 1em;
  color: #fff;
  font-size: 1.2rem;
`;


class CreateForm extends Component {
  constructor() {
    super();
    this.state = {
      story: ''
    };
  }

  _handleSubmit = e => {
    e.preventDefault();
    const storyWords = this.state.story
      .toLowerCase()
      .replace(/[^\w|\s]/g, "")
      .split(/\s/);

    this.props.allWords(storyWords);

  }
  _handleChange = e => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
  }

  _handleReset = () => {
    this.setState({story: ''})
    this.props.reset()
  }

  _handleKeyPress = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      this._handleSubmit(e)
    }
  }

  render() {
    return(
      <div>
        <form onSubmit={this._handleSubmit}>
          <StyledDiv>
          <StyledInput
            placeholder="Tell me your story..."
            value={this.state.story}
            name="story"
            onChange={this._handleChange}
            onKeyPress={this._handleKeyPress}
            autoComplete="off"
            autoFocus="on"
            minRows={1}
            maxRows={5}
          />
          </StyledDiv>
          <button type="button" onClick={this._handleReset}>Reset</button>

          <StyledButton type="submit">Update</StyledButton>
        </form>
      </div>
    );
  }
}

export default CreateForm;
