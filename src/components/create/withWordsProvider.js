import React, { Component } from 'react';
import WordsContext from './wordsContext';
import { withFirebase } from '../../firebase';

const withWordsProvider = InnerComponent => {
  class WithWordsProvider extends Component {
    constructor(props) {
      super(props);
      this.state = {
        words: null,
      };
    }

    async componentDidMount() {
      //get current list of words from db
      let words = [];
      await this.props.firebase.getAllWords().then(snapshot => {
        snapshot.forEach(doc => {
          words.push(doc.id)
        })
        this.setState({words: words})
      });
    }

    render() {
      return (
        <WordsContext.Provider value={this.state.words}>
          <InnerComponent {...this.props} />
        </WordsContext.Provider>
      );
    }
  }

  return withFirebase(WithWordsProvider);
};

export default withWordsProvider;
