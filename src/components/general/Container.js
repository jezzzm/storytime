import React from 'react';

import styled from '@emotion/styled';

const StyledContainer = styled.div`
  max-width: 960px;
  width: 100%;
  margin: 1.5em auto;
  padding: 0 2em;
`;
export default props => (
  <StyledContainer {...props}>
    {props.children}
  </StyledContainer>
);
