import React from 'react';

//routing
import { Link } from 'react-router-dom';

//styles
import styled from '@emotion/styled';
import * as S from '../../constants/style'


const StyledSVG = styled.svg`
  margin-top:5px;
  width:60px;
  path {
    fill: rgba(255,255,255,0.8);
    transition: 0.2s fill;
  }

`;

const StyledAnchor = styled(Link)`
  display:block;
  width: 80px;
  height: 40px;
  align-self: center;
  text-align: center;
  z-index: 1000;
  background: #fea116;
  box-shadow: 0 -10px 10px rgba(0,0,0,0.05);
  padding: 10px 10px 0;
  border-radius: 15% 15% 0 0;
  &:hover path {
    fill: white;
  }
`;


const Dice = (props) => {
  return(
    <StyledAnchor onClick={props.onClick} to="#" title="Add a random drawing...">
    <StyledSVG aria-hidden="true" focusable="false" data-prefix="fas" data-icon="dice" className="svg-inline--fa fa-dice fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M592 192H473.26c12.69 29.59 7.12 65.2-17 89.32L320 417.58V464c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48V240c0-26.51-21.49-48-48-48zM480 376c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm-46.37-186.7L258.7 14.37c-19.16-19.16-50.23-19.16-69.39 0L14.37 189.3c-19.16 19.16-19.16 50.23 0 69.39L189.3 433.63c19.16 19.16 50.23 19.16 69.39 0L433.63 258.7c19.16-19.17 19.16-50.24 0-69.4zM96 248c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"></path></StyledSVG>
    </StyledAnchor>
  );
}

export default Dice;
