import React, { Component, Fragment } from 'react';

//styles
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
      isLoadingStory: true,
      isSaving: false
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
          this.setState({isLoadingStory: false})
          console.log('loaded: ', this.props.creation)
        })
    } else if (this.props.creation && !this.props.authUser.info) {
      this.setState({isLoadingStory: false});
    } else {
      this.props.creation.clearCreation()
      this.setState({isLoadingStory: false});
    }
  }

  _handleNewDrawing = () => {
    const { creation } = this.props;
    if (Object.keys(creation.pages[this.state.page].drawings).length < 10) {
      const index = creation.drawingsIndex;
      const rand = index[Math.floor(Math.random() * index.length)]
      this.props.firebase
        .getDrawing(rand) //choose randomly from all drawings
        .then(doc => {
          const pages = creation.pages;
          const curr = this.state.page;

          creation.updatePages({
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

  _handleTitleChange = e => {
    this.props.creation.updateTitle(e.target.value)
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
    this.setState({isSaving: true})

    const uid = this.props.firebase.auth.W;
    if(!this.props.creation.id) { //not yet saved => new entry
      this.props.firebase.saveStory({
        uid: uid,
        pages: this.props.creation.pages,
        title: this.props.creation.title,
        created: Date.now(),
        modified: Date.now()
      }).then(({ id }) => {
        console.log('created: ', id);
        this.props.creation.updateID(id);
        this.setState({isSaving: false});
      })
    } else { //update old entry
      this.props.firebase.saveStory({
        pages: this.props.creation.pages,
        title: this.props.creation.title,
        modified: Date.now()
      }, this.props.creation.id)
      .then(() => {
        console.log('updated: ', this.props.creation.id);
        this.setState({isSaving: false});
      })
    }
    this.props.authUser.fetchStories();
  }

  _handleClear = () => {
    const pages = this.props.creation.pages;
    const curr = this.state.page;

    this.props.creation.updatePages({
      ...pages,
      [curr]: {
        ...pages[curr],
        drawings: {},
        text: ''
      }
    });
  }

  _handlePageNav = e => {
    e.preventDefault();
    const curr = this.state.page;
    const dir = e.target.name;

    if (curr === 0 && dir === 'back') { //can't go back
      console.log('at beginning')
      // TODO: more here
    } else {
      if (dir === "back") {
        this.setState({page: curr - 1}) //move back
      } else {
        if(!this.props.creation.pages[curr + 1]) { //doesn't exist yet, create
          this.props.creation.addPage(curr + 1);
        }
        this.setState({page: curr + 1}) //move forward
      }
    }
  }

  render() {
    const {isLoadingStory, isSaving} = this.state;
    const isLoadingIndex = !this.props.creation.drawingsIndex;
    const isAuthed = !!this.props.authUser.info;
    const current = this.props.creation.pages[this.state.page];
    const drawings = Object.values(current.drawings);
    const text = current ? current.text : '';
    const title= this.props.creation.title;

    return(
      <Fragment>
        <StyledDrawContainer>
          {isLoadingIndex || isLoadingStory || isSaving ? (
            <BlueSpinner />
          ):(
            <Fragment>
              <StyledPageNav name="back" onClick={this._handlePageNav}>&larr;</StyledPageNav>
              <StyledDrawBox>
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
              <StyledPageNav name="forward" onClick={this._handlePageNav}>&rarr;</StyledPageNav>
            </Fragment>
          )}
        </StyledDrawContainer>
        {!isLoadingIndex && (
          <Fragment>
            <Dice onClick={this._handleNewDrawing}/>
            <CreateForm
              text={text}
              onTextChange={this._handleTextChange}
              onClear={this._handleClear}
              onSave={this._handleSave}
              isAuthed={isAuthed}
              title={title}
              onTitleChange={this._handleTitleChange}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
};

export default withFirebase(withCreation(withAuth(Create)));
