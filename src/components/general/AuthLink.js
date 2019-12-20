import React from 'react';

import styled from '@emotion/styled';
import * as S from '../../constants/style';
import { Link } from 'react-router-dom';

const AuthLink = styled(Link)`
  margin: 2em 0;
  color: white;
  text-decoration: none;
  display: inline-block;
  font-size: 1.2em;
`;

export default props => <AuthLink {...props}>{props.children}</AuthLink>;
