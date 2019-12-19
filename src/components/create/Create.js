import React, { Component, Fragment } from 'react';

//styles
import styled from '@emotion/styled';

//context
import { withFirebase } from '../../firebase';
import { withCreation } from './CreationContext';
import { withAuth } from '../auth/authContext';

//components
import Dice from './Dice';
import CreationControl from './CreationControl';
import SpinnerBlue from '../general/SpinnerBlue';
import DrawContent from './DrawContent'

const StyledPage = styled.div`
  flex: 1;
  display: flex;
`;

class Create extends Component {
  constructor() {
    super()
    this.state = {
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
                  x: window.screen.availWidth/2.5, //TODO: can randomise these for variation to start placement
                  y: window.screen.availHeight/4
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
    console.log(this.props.creation)
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
        this.props.authUser.fetchUserData(this.props.authUser.info.uid);

      })
    } else { //update old entry
      this.props.firebase.saveStory({
        pages: this.props.creation.pages,
        title: this.props.creation.title,
        modified: Date.now()
      }, this.props.creation.id)
      .then(() => {
        console.log('updated: ', this.props.creation.id);
        console.log(this.props.creation)

        this.setState({isSaving: false});
        this.props.authUser.fetchUserData(this.props.authUser.info.uid);

      })
    }
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
        <StyledPage>
          {isLoadingIndex || isLoadingStory || isSaving ? (
            <SpinnerBlue />
          ):(
            <DrawContent
              drawings={drawings}
              page={this.state.page}
              changePage={this._handlePageNav}
              drawingChange={this._handleDrawingChange}
              title={title}
              onTitleChange={this._handleTitleChange}
            />
          )}
        </StyledPage>
        {!isLoadingIndex && (
          <Fragment>
            <Dice onClick={this._handleNewDrawing}/>
            <CreationControl
              text={text}
              onTextChange={this._handleTextChange}
              onClear={this._handleClear}
              onSave={this._handleSave}
              isAuthed={isAuthed}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
};



export default withFirebase(withCreation(withAuth(Create)));
