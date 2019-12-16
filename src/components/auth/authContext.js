import React from 'react';
const AuthContext = React.createContext(null);

export default AuthContext; //for wrapping jsx

export const withAuth = InnerComponent => props =>  ( //HOC alternative
  <AuthContext.Consumer>
    {user => <InnerComponent {...props} authUser={user} />}
  </AuthContext.Consumer>
);
