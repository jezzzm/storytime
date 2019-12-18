import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

//context
import { withFirebase } from '../../firebase';
import { withCreation } from './CreationContext';
import { withAuth } from '../auth/authContext';

//components
import Drawing from './Drawing';
import Dice from './Dice';
import CreateForm from './CreateForm';
import BlueSpinner from '../app/BlueSpinner';

const StyledDrawBox = styled.div`
  padding: 1.5em;
  min-height: 100%;
  position: relative;
  flex: 1;
`;

const StyledDrawContainer = styled.div`
  flex: 1;
  display: flex;
`;

const StyledPageNav = styled.button`
  font-size: 2rem;
  color: rgba(255,255,255,0.5);
  background: transparent;
  border: 0;
  transition: 0.3s box-shadow;
  cursor: pointer;
  &:focus {
    outline: none;
    color: white;
  }
  &:hover {
    outline: none;
    color: white;
  }
`;

class Create extends Component {
  constructor() {
    super()
    this.state = {
      text: '',
      page: 0,
    }
  }

  componentDidMount() {
    if (this.props.story) {
      this.props.firebase
        .getStory(this.props.story)
        .then(doc => {
          const story = doc.data();
          this.props.creation.updateID(doc.id)
          this.props.creation.updatePages(story.pages)
          this.props.creation.updateTitle(story.title)
          console.log(this.props.creation)
        })
    }

  }

  _handleNewDrawing = () => {
    if (Object.keys(this.props.creation.pages[this.state.page].drawings).length < 10) {
      const index = this.props.creation.drawingsIndex;
      const rand = index[Math.floor(Math.random() * index.length)]
      this.props.firebase
        .getDrawing(rand) //choose randomly from all drawings
        .then(doc => {
          const pages = this.props.creation.pages;
          const curr = this.state.page;

          this.props.creation.updatePages({
            ...pages,
            [curr]: {
              ...pages[curr],
              drawings: {
                ...pages[curr].drawings,
                [doc.id]: {
                  ...doc.data(),
                  id: doc.id,
                  height: 250,
                  width: 250,
                  x: 0, //TODO: can randomise these for variation to start placement
                  y: 0
                }
              }
            }
          })
          console.log(doc.id, doc.data())
        })
    } else {
      console.log('too many drawings');
      //TODO: more here
    }

  }

  _handleTextChange = e => {
    this.props.creation.updatePages({
      ...this.props.creation.pages,
      [this.state.page]: {
        ...this.props.creation.pages[this.state.page],
        text: e.target.value
      }
    });
  }

  _handleDrawingChange = (id, data) => {
    const pages = this.props.creation.pages;
    const curr = this.state.page;

    this.props.creation.updatePages({
      ...pages,
      [curr]: {
        ...pages[curr],
        drawings: {
          ...pages[curr].drawings,
          [id]: {
            ...pages[curr].drawings[id],
            ...data
          }
        }
      }
    });
  }

  _handleSave = () => {
    const uid = this.props.firebase.auth.W;
    console.log('saving...')
    if(!this.props.creation.id) { //not yet saved => new entry
      this.props.firebase.saveStory({
        uid: uid,
        pages: this.props.creation.pages,
        title: this.props.creation.title,
        created: Date.now(),
        modified: Date.now()
      }).then(({ id }) => {
        console.log('created: ', id);

        this.props.creation.updateID(id)
      })
    } else { //update old entry
      this.props.firebase.saveStory({
        pages: this.props.creation.pages,
        title: this.props.creation.title,
        modified: Date.now()
      }, this.props.creation.id)
      .then(() => console.log('updated: ', this.props.creation.id))
    }

    this.props.authUser.fetchStories();

  }

  render() {
    const isLoading = !this.props.creation.drawingsIndex;
    const isAuthed = !!this.props.authUser;
    const drawings = Object.values(this.props.creation.pages[this.state.page].drawings);
    const current = this.props.creation.pages[this.state.page];
    const text = current ? current.text : '';
    return(

      <Fragment>
        <StyledDrawContainer>
          {isLoading ? (
            <BlueSpinner />
          ):(
            <Fragment>
              <StyledPageNav>&larr;</StyledPageNav>
              <StyledDrawBox>
                {isAuthed ? (
                  <button onClick={this._handleSave}>Save</button>
                ) : (
                  <p><Link to="signup">Sign up</Link> or <Link to="/signin">sign in</Link> to save story  </p>
                )}

                {drawings.map((d, i) => (
                  <Drawing
                    drawing={d}
                    key={i}
                    name={d.id}
                    currentPage={this.state.page}
                    drawingChanged={(id, data) => this._handleDrawingChange(id, data)}
                  />
                ))}
              </StyledDrawBox>
              <StyledPageNav>&rarr;</StyledPageNav>
            </Fragment>
          )}
        </StyledDrawContainer>
        {isLoading ? (
          <Fragment></Fragment>
        ):(
          <Fragment>
            <Dice onClick={this._handleNewDrawing}/>
            <CreateForm onChange={this._handleTextChange} text={text} />
          </Fragment>
        )}

      </Fragment>
    );
  }
};


export default withFirebase(withCreation(withAuth(Create)));
