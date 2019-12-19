import React from 'react';

//styles
import styled from '@emotion/styled';
import * as S from '../../constants/style';

const Heading = styled.h1`
  font-size:4em;
  font-family: 'Gaegu', sans-serif;
  color: ${S.COPY};
  text-shadow: 1px 1px 0 #fff;
`;

export default props => (
  <Heading {...props}>
    {props.children}
  </Heading>
)
