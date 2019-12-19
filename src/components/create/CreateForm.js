import React from 'react';
import { Link } from 'react-router-dom';

//styles
import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';
import * as S from '../../constants/style';

const StyledInput = styled(TextareaAutosize)`
  border: 0;
  background: transparent;
  font-size: 1.5rem;
  color: ${S.COPY};
  padding: 0.7em;
  flex:1;
  resize: none;
  font-family: 'Pangolin', sans-serif;
  transition: 0.3s box-shadow;
  &:focus {
    outline: none;
    box-shadow: inset 10px 0px 0px ${S.L_BLUE};
  }
  &::placeholder {
    color: rgba(255,255,255,0.5);
  }
`;

const StyledContainer = styled.div`
  display:flex;
  background: rgba(255,255,255,0.1);
  box-shadow: ${S.L_SHADOW_U};
  align-items: center;
  a {
    text-decoration: none;
    font-family: ${S.FANCY};
    color: ${S.COPY};
    padding: 0.5em 1.5em;
    border-radius: 0.2em;
    margin-right: 1em;
    box-shadow: ${S.S_SHADOW};
    transition: 0.2s box-shadow;
    &:hover {
      box-shadow: ${S.S_SHADOW_H}
    }
  }
  a.clear {
    background: ${S.L_BLUE}
  }
  a.save {
    background: ${S.GREEN};
  }
`;


const CreateForm = props => (
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
    <input
      name="title"
      onChange={props.onTitleChange}
      value={props.title}
      placeholder="Title of the Story"
    />
    <Link to="#" onClick={props.onClear} className="clear">Clear</Link>
    {props.isAuthed && <Link to="#" onClick={props.onSave} className="save">Save</Link>}
  </StyledContainer>
);


export default CreateForm;
