import React from 'react';

const FirebaseContext = React.createContext(null);

export default FirebaseContext; //for wrapping jsx

export const withFirebase = Component => props =>  ( //HOC alternative
  <FirebaseContext.Consumer>
    {fb => <Component {...props} firebase={fb} />}
  </FirebaseContext.Consumer>
);
