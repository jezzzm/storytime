import React from 'react';
const WordsContext = React.createContext(null);

export default WordsContext;

export const withWords = InnerComponent => props =>  ( //HOC alternative
  <WordsContext.Consumer>
    { words => <InnerComponent {...props} words={words} /> }
  </WordsContext.Consumer>
);
