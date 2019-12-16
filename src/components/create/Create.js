import React, { Component } from 'react';

//context
import { withFirebase } from '../../firebase';
import { withWords } from './wordsContext';

//components
import Drawing from './Drawing';
import CreateForm from './CreateForm';

class Create extends Component {
  constructor() {
    super();
    this.state = {
      drawings: {}
    }
  }

  checkWords = words => {
    const drawnWords = Object.keys(this.state.drawings)
    const wordsToRemove = drawnWords.filter(w => !words.includes(w));
    this.setState({drawings: this.removeDrawings(wordsToRemove)});

    const wordsToFetch = words.filter(w => this.props.words.includes(w) && !drawnWords.includes(w));
    wordsToFetch.forEach(w => this.fetchWord(w));
  }

  removeDrawings = keys => {
    const clone = Object.assign({}, this.state.drawings);
    keys.forEach(k => delete clone[k])

    return clone
  }

  fetchWord = w => {
    this.props.firebase
      .getWord(w)
      .then(doc => {
        if (doc.exists && !Object.keys(this.state.drawings).includes(w)) {
          const drawings = doc.data().drawings;
          const rand = drawings[ Math.floor(Math.random() * drawings.length) ];
          this.setState( { drawings: {...this.state.drawings, [doc.id]: rand } })
        } else {
          console.log(`already drawn in story: '${w}'.`)
        }
      })
      .catch(err => console.log('caught: ', err)) //some other error
  }

  doReset = () => {
    this.setState({drawings: {}})
  }

  render() {
    const values = Object.values(this.state.drawings);
    return(
      <div>
        <h1>Create</h1>
        <CreateForm allWords={this.checkWords} reset={this.doReset}/>
        {values.map((v, i) => (
          <Drawing drawing={v} key={i}/>
        ))}
      </div>
    );
  }
};



export default withFirebase(withWords(Create));
