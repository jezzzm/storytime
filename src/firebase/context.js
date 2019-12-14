import React from 'react';

const FirebaseContext = React.createContext(null);

export default FirebaseContext; //for wrapping jsx

export const withFirebase = InnerComponent => props =>  ( //HOC alternative
  <FirebaseContext.Consumer>
    {fb => <InnerComponent {...props} firebase={fb} />}
  </FirebaseContext.Consumer>
);
