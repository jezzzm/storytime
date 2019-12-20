import React from 'react';

//styles
import styled from '@emotion/styled';
import * as S from '../../constants/style';

const ButtonSubmit = styled.button`
  background: ${S.GREEN};
  color: ${S.COPY};
  border: 0;
  padding: 0.5em 1.5em;
  box-shadow: ${S.S_SHADOW};
  border-radius: 0.2em;
  font-family: ${S.FANCY};
  font-size: 1.2em;
  text-decoration: none;
  color: ${S.COPY};
  transition: 0.2s box-shadow;
  &:hover {
    box-shadow: ${S.S_SHADOW_H}
  }
`;

export default props => (
  <ButtonSubmit {...props} >
    {props.children}
  </ButtonSubmit>
);
