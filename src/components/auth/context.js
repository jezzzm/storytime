import React from 'react';
const AuthContext = React.createContext(null);

export default AuthContext; //for wrapping jsx

export const withAuth = Component => props =>  ( //HOC alternative
  <AuthContext.Consumer>
    {user => <Component {...props} authUser={user} />}
  </AuthContext.Consumer>
);
