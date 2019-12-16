import React, { Component } from 'react';
import { withWords } from './wordsContext';

class CreateForm extends Component {
  constructor() {
    super();
    this.state = {
      story: ''
    };
  }

  _handleSubmit = e => {
    e.preventDefault();
    const storyWords = this.state.story.replace(/[^\w|\s]/g, "").split(' ');
    this.props.allWords(storyWords);

  }
  _handleChange = e => {
    const str = e.target.value
    this.setState({[e.target.name]: str})
  }
  render() {
    return(
      <form onSubmit={this._handleSubmit}>
        <input placeholder="Enter your story" value={this.state.story} name="story" onChange={this._handleChange}/>
        <button type="submit">Update Images</button>
      </form>
    );
  }
}

export default withWords(CreateForm);
