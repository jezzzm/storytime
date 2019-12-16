import React, { Component } from 'react';

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

  _handleReset = () => {
    this.setState({story: ''})
    this.props.reset()
  }
  
  render() {
    return(
      <div>
        <form onSubmit={this._handleSubmit}>
          <input placeholder="Enter your story" value={this.state.story} name="story" onChange={this._handleChange}/>
          <button type="submit">Update Images</button>
        </form>
        <button onClick={this._handleReset}>Reset</button>
      </div>
    );
  }
}

export default CreateForm;
