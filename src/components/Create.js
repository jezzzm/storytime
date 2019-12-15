import React, { Component } from 'react';
import { withFirebase } from '../firebase';
import Drawing from '../utils/Drawing';


class Create extends Component {
  constructor() {
    super();
    this.state = {
      drawing: null
    }
  }
  async componentDidMount() {
    await this.findDrawing('basket').then(res => {
      console.log(res)
      this.setState({drawing: res})

    });
    // const svg = new Drawing(drawing).buildSVG()
    // console.log(svg)
    // this.setState({d3: svg});
  }

  findDrawing(word) {
    return this.props.firebase.getRandomDrawing(word)
  }
  render() {
    if (!this.state.drawing) {
      return null;
    }
    return(
      <div>
        <h1>Create</h1>
        <Drawing drawing={this.state.drawing} />
      </div>
    );
  }
};

export default withFirebase(Create);
