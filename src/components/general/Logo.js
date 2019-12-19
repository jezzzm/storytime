import React from 'react';

//routes
import { Link } from 'react-router-dom';

//styles
import styled from '@emotion/styled';
import * as S from '../../constants/style';

const Logo = styled(Link)`
  font-size: 2em;
  text-decoration: none;
  font-family: 'Gaegu', sans-serif;
  color: ${S.COPY};
  text-shadow: 1px 1px 0 #fff;
  transition: 0.3s all;
  &:hover {
    text-shadow: none;
  }
`;
export default props => (
  <Logo {...props}>
    storytime
  </Logo>
)
