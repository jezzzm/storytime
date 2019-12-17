import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled';

//context
import { withFirebase } from '../../firebase';
import { withCreation } from './CreationContext';

//components
import Drawing from './Drawing';
import CreateForm from './CreateForm';

const StyledDrawBox = styled.div`
  padding: 1em;
  min-height: 100%;
  position: relative;
  flex: 1;
  margin: 0 1.5em;
`;

const StyledDrawContainer = styled.div`
  flex: 1;
  display: flex;
`;

const StyledButton = styled.button`
  font-size: 2rem;
  color: rgba(255,255,255,0.5);
  background: rgba(0,0,0,0.1);
  border: 0;
  transition: 0.3s box-shadow;
  &:focus {
    box-shadow: 0 0 30px rgba(255,255,255,1);
    outline: none;
  }
  &:hover {
    box-shadow: 0 0 30px rgba(255,255,255,0.5);
    outline: none
  }
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

  doGetNew = () => {
    console.log('clicked')
    const index = this.props.creation.drawingsIndex;
    const rand = index[Math.floor(Math.random() * index.length)]
    console.log(rand);
    this.props.firebase
      .getDrawing(rand)
      .then(doc => {
        this.props.creation.updateDrawings({...this.props.creation.drawings, [doc.id]: doc.data() })
        console.log(doc.id, doc.data())
      })
      // .getAllDrawings()
      // .then(snapshot => {
      //   console.log(typeof snapshot)
        // console.log(snapshot[Math.floor(Math.random() * snapshot.length)])
        // snapshot.forEach(doc => {
        //   // console.log(doc.id, doc.data())
        //
        // })
      // })
  }

  render() {
    const values = Object.values(this.props.creation.drawings);
    return(
      <Fragment>
        <StyledDrawContainer>
          <StyledButton>&larr;</StyledButton>
          <StyledDrawBox>
            {values.map((v, i) => (
              <Drawing drawing={v} key={i}/>
            ))}
          </StyledDrawBox>
          <StyledButton>&rarr;</StyledButton>
        </StyledDrawContainer>
        <CreateForm allWords={this.checkWords} reset={this.doReset} getNew={this.doGetNew}/>
      </Fragment>
    );
  }
};



export default withFirebase(withCreation(Create));
