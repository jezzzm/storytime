import React, { Fragment } from 'react';

//styles
import styled from '@emotion/styled';

//components
import Drawing from './Drawing';
import TitleForm from './TitleForm';

const StyledPageNav = styled.button`
  font-size: 2rem;
  color: rgba(255,255,255,0.5);
  background: transparent;
  border: 0;
  transition: 0.3s box-shadow;
  cursor: pointer;
  &:focus {
    outline: none;
    color: white;
  }
  &:hover {
    outline: none;
    color: white;
  }
`;

const StyledDrawBox = styled.div`
  padding: 1.5em;
  min-height: 100%;
  position: relative;
  flex: 1;
`;

const DrawContent = props => (
  <Fragment>
    {props.page !== 0 && <StyledPageNav name="back" onClick={props.changePage}>&larr;</StyledPageNav>}
    <StyledDrawBox>
      <TitleForm title={props.title} onTitleChange={props.onTitleChange} />
      {props.drawings.map((d, i) => (
        <Drawing
          drawing={d}
          key={i}
          name={d.id}
          currentPage={props.page}
          drawingChanged={(id, data) => props.drawingChange(id, data)}
        />
      ))}
    </StyledDrawBox>
    <StyledPageNav name="forward" onClick={props.changePage}>&rarr;</StyledPageNav>
  </Fragment>
);

export default DrawContent;
