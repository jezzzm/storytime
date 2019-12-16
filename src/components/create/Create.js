import React, { Component } from 'react';
import { withFirebase } from '../../firebase';

//components
import Drawing from './Drawing';
import CreateForm from './CreateForm';


class Create extends Component {
  constructor() {
    super();
    this.state = {
      validWords: [],
      drawings: []
    }
  }

  _handleValidWords = (words) => {
    words.forEach(w => {
      this.props.firebase
        .getWord(w)
        .then(doc => {
          console.log(doc)
          const drawings = doc.data().drawings || null;
          if (drawings) {

            const rand = drawings[ Math.floor(Math.random() * drawings.length) ];
            console.log(rand)
            this.setState( { validWords: [...this.state.validWords, doc.id] } )
            this.setState( { drawings: [...this.state.drawings, rand] } ) //overflow not checked

          }
        })
        .catch(err => console.log('caught: ', err)) //no drawings found?
    })
  }

  render() {
    return(
      <div>
        <h1>Create</h1>
        <CreateForm allWords={this._handleValidWords}/>
        {this.state.drawings.map(d => (
          <Drawing drawing={d} />
        ))}
        <Drawing drawing={this.state.drawing} />
      </div>
    );
  }
};



export default withFirebase(Create);
