import React, { Component } from 'react';
import styled from '@emotion/styled';

const StyledSVG = styled.svg`
  stroke: #222;
  stroke-width: 5;
  fill: none;
  padding: 5px;
  box-model:  border-box;
`;

export default class Drawing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: this.buildPath(),
      width: 265,
      height: 265
    }
  }

  buildPath() {
    let data = '';
    for (let stroke in this.props.drawing) {
      this.props.drawing[stroke].forEach((p, i) => {
        let newPath = 'M'
        p[i].forEach((point, j) => {
          if (j !== 0) { //we already have the Move key for the first pair
            newPath += 'L'
          }
          newPath += (point.x + 5) + ',' + (point.y + 5)
          if (j !== p[i].length - 1) {
            newPath += ','
          }
        })
        data += newPath
      });

    }
    return data;
  }

  render() {
    return(
      <StyledSVG width={this.state.width} height={this.state.height}>
        <path d={this.state.path} />
      </StyledSVG>
    );
  }
}
