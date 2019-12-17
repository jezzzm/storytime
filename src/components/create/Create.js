import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled';

//context
import { withFirebase } from '../../firebase';
import { withCreation } from './CreationContext';

//components
import Drawing from './Drawing';
import CreateForm from './CreateForm';

const StyledDiv = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 1em;
  min-height: 100%;
  flex: 1;
  position: relative;
`;


class Create extends Component {

  checkWords = words => {
    console.log('all', words)
    const drawnWords = Object.keys(this.props.creation.drawings)
    const wordsToRemove = drawnWords.filter(w => !words.includes(w));
    console.log('remove', wordsToRemove)
    this.props.creation.updateDrawings(this.removeDrawings(wordsToRemove));

    const wordsToFetch = words.filter(w => this.props.creation.words.includes(w) && !drawnWords.includes(w));
    console.log('fetch', wordsToFetch)
    wordsToFetch.forEach(w => this.fetchWord(w));
  }

  removeDrawings = keys => {
    const clone = Object.assign({}, this.props.creation.drawings);
    keys.forEach(k => delete clone[k])
    return clone;
  }

  fetchWord = w => {
    this.props.firebase
      .getWord(w)
      .then(doc => {
        if (doc.exists && !Object.keys(this.props.creation.drawings).includes(w)) {
          console.log('found', doc.id)
          const drawings = doc.data().drawings;
          const rand = drawings[ Math.floor(Math.random() * drawings.length) ];
          this.props.creation.updateDrawings({...this.props.creation.drawings, [doc.id]: rand })
        } else {
          console.log(`already drawn in story: '${w}'.`)
        }
      })
      .catch(err => console.log('caught: ', err)) //some other error
  }

  doReset = () => {
    this.props.creation.updateDrawings({});
  }

  render() {
    const values = Object.values(this.props.creation.drawings);
    return(
      <Fragment>
        <CreateForm allWords={this.checkWords} reset={this.doReset}/>
        <StyledDiv>
          {values.map((v, i) => (
            <Drawing drawing={v} key={i}/>
          ))}
        </StyledDiv>
      </Fragment>
    );
  }
};



export default withFirebase(withCreation(Create));
