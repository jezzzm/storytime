import React from 'react';

//styles
import styled from '@emotion/styled';

const StyledInput = styled.input`
  background:transparent;
  position: relative;
  top: 0;
  left: 50%;
  color: white;
  transform: translateX(-50%);
  border: 0;
  font-family: 'Gaegu', sans-serif;
  font-size: 3em;
  text-align: center;
  width: 100%;
  text-shadow: 2px 2px rgba(0,0,0,0.3);
  z-index: 100;
  &::placeholder {
    transition: 0.2s all;
    color: rgba(255,255,255,0.7);
  }
  &:focus {
    outline: none;
    &::placeholder {
      color: transparent;
      text-shadow: none;
    }
  }
`;

const TitleForm = props => (
  <StyledInput
    name="title"
    onChange={props.onTitleChange}
    value={props.title}
    placeholder="I'm the title of your story..."
    autoComplete="off"
  />
)

export default TitleForm;
