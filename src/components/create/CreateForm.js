import React from 'react';
import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';

const StyledInput = styled(TextareaAutosize)`
  background: rgba(255,255,255,0.1  );
  border: 5px solid transparent;
  font-size: 1.5rem;
  color: #222;
  padding: 0.7em;
  resize: none;
  font-family: 'Pangolin', sans-serif;
  box-shadow: 0 -10px 10px rgba(0,0,0,0.05);
  transition: 0.3s background;
  &:focus {
    outline: none;
    background: rgba(255,255,255,0.2);
  }
  &:hover {
    background: rgba(255,255,255,0.15);
  }
  &::placeholder {
    color: rgba(255,255,255,0.5);
  }
`;

const CreateForm = props => (
  <StyledInput
    placeholder="Tell me your story..."
    value={props.text}
    name="text"
    onChange={props.onChange}
    autoComplete="off"
    autoFocus="on"
    minRows={1}
    maxRows={5}
  />
);

export default CreateForm;
