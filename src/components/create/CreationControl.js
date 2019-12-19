import React from 'react';
import { Link } from 'react-router-dom';

//styles
import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';
import * as S from '../../constants/style';

//components
import ButtonGreen from '../general/ButtonGreen';
import ButtonBlue from '../general/ButtonBlue';


const StyledInput = styled(TextareaAutosize)`
  border: 0;
  background: transparent;
  font-size: 1.5rem;
  color: ${S.COPY};
  padding: 0.7em;
  flex:1;
  resize: none;
  transition: 0.3s box-shadow;
  &:focus {
    outline: none;
    box-shadow: inset 10px 0px 0px ${S.L_BLUE};
    &::placeholder {
      color: transparent;
    }
  }
  &::placeholder {
    color: rgba(255,255,255,0.7);
    transition: 0.2s all;
  }
`;

const StyledContainer = styled.div`
  display:flex;
  background: rgba(255,255,255,0.1);
  box-shadow: ${S.L_SHADOW_U};
  align-items: center;
  a {
    margin-right: 1em;
  }
`;

const CreationControl = props => (
  <StyledContainer>
    <StyledInput
      placeholder="What's the story?"
      value={props.text}
      name="text"
      onChange={props.onTextChange}
      autoComplete="off"
      autoFocus="on"
      minRows={1}
      maxRows={5}
    />
    <ButtonBlue to="#" onClick={props.onClear}>Clear</ButtonBlue>
    {props.isAuthed && <ButtonGreen to="#" onClick={props.onSave}>Save</ButtonGreen>}
  </StyledContainer>
);


export default CreationControl;
