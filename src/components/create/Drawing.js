import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Rnd } from 'react-rnd';

const StyledSVG = styled.svg`
  stroke: #222;
  stroke-width: 5;
  stroke-linecap: round;
  fill: none;
  // padding: 5px;
  display: inline-block;
`;

const StyledRnd = styled(Rnd)`
  // padding: 10px;
  border: 3px solid transparent;
  &:hover {
    border: 3px dashed rgba(0,0,0,0.3);
    // box-sizing: border-box;
  }
`;

export default class Drawing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 250,
      height: 250,
      x: 0,
      y: 0,
      path: ''
    }
  }

  componentDidMount() {
    this.setState({path: this.buildPath()})
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
          const newX = point.x/250 * this.state.width + 10;
          const newY = point.y/250 * this.state.height + 10;
          newPath += newX + ',' + newY
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
    const widthSVG = this.state.width + 30;
    const heightSVG = this.state.height + 30;
    const widthRnd = this.state.width + 46;
    const heightRnd = this.state.height + 46;

    return(
      <StyledRnd
        size={{width: widthRnd, height: heightRnd}}
        position={{x: this.state.x, y: this.state.y}}
        onDragStop={ (e, d) => this.setState({x: d.x, y: d.y})}
        onResize={(e, dir, ref, delta, pos) => {
          this.setState({
            width: ref.offsetWidth,
            height: ref.offsetHeight,
            path: this.buildPath(),
            ...pos
          })
        }}
        bounds="parent"

      >
        <StyledSVG width={widthSVG} height={heightSVG}>
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
      </StyledRnd>
    );
  }
}
