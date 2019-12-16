import React from 'react';
const CreationContext = React.createContext(null);

export default CreationContext;

export const withCreation = InnerComponent => props =>  ( //HOC alternative
  <CreationContext.Consumer>
    { data => <InnerComponent {...props} creation={data} /> }
  </CreationContext.Consumer>
);
