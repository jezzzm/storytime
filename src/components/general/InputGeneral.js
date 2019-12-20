import React from 'react';

import styled from '@emotion/styled';
import * as S from '../../constants/style';

const StyledInput = styled.input`
  padding: 1em;
  margin-right: 2em;
  border: 0;
  font-size: 1.1em;
  font-family: ${S.FANCY};
  background: rgba(255,255,255,0.8);
`;


export default props => <StyledInput {...props} />
