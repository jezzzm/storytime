import React, { Component } from 'react';
import styled from '@emotion/styled';

const StyledSVG = styled.svg`
  stroke: #222;
  stroke-width: 5;
  stroke-linecap: round;
  fill: none;
  padding: 5px;
`;

export default class Drawing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: this.buildPath(),
      width: 280,
      height: 280
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
        <defs>
          <filter id="f2" x="0" y="0" width="120%" height="120%">
            <feOffset result="offOut" in="SourceAlpha" dx="5" dy="5" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4"/>
            </feComponentTransfer>
            <feMerge xmlns="http://www.w3.org/2000/svg">
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path d={this.state.path} filter="url(#f2)" />
      </StyledSVG>
    );
  }
}
