import React from 'react';

//routing
import { Link } from 'react-router-dom';
//styles
import styled from '@emotion/styled';
import * as S from '../../constants/style';

const ButtonGreen = styled(Link)`
  background: ${S.L_BLUE};
  color: ${S.COPY};
  padding: 0.5em 1.5em;
  box-shadow: ${S.S_SHADOW};
  border-radius: 0.2em;
  text-decoration: none;
  color: ${S.COPY};
  transition: 0.2s box-shadow;
  &:hover {
    box-shadow: ${S.S_SHADOW_H}
  }
`;

export default props => (
  <ButtonGreen {...props}>
    {props.children}
  </ButtonGreen>
);
