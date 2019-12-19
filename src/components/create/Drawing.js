import React, { Component } from 'react';

//styles
import styled from '@emotion/styled';
import * as S from '../../constants/style';

//components
import { Rnd } from 'react-rnd';

const StyledSVG = styled.svg`
  stroke: ${S.COPY};
  stroke-width: 5;
  stroke-linecap: round;
  fill: none;
  display: inline-block;
`;

const StyledRnd = styled(Rnd)`
  border: 3px solid transparent;
  &:hover {
    border: 3px dashed rgba(0,0,0,0.3);
  }
`;

export default class Drawing extends Component {

  componentDidMount() {
    const data = this.parseData()
    this.props.drawingChanged(this.props.drawing.id, data);
  }

  parseData() {
    let path = '';
    const drawing = this.props.drawing
    const coords = drawing.coords;

    let [nativeWidth, nativeHeight] = [0, 0]; //to set our initial aspect ratio correctly

    //iterate through coord pairs to generate SVG path string, also check aspect ratio
    for (let stroke in coords) {
      let pathSegment = 'M'
      let strokeArray = Object.values(coords[stroke])[0];

      strokeArray.forEach((p, i) => {
        if (p.x > nativeWidth) nativeWidth = p.x;
        if (p.y > nativeHeight) nativeHeight = p.y;
        if (i !== 0) pathSegment += 'L';
        pathSegment += p.x + ',' + p.y
        if (i !== strokeArray.length - 1) pathSegment += ',';
      });
      path += pathSegment
    }
    return {
      path,
      nativeWidth,
      nativeHeight,
      width: nativeWidth,
      height: nativeHeight
    };
  }

  _handleDragStop = (e, d) => { //update context for position
    this.props.drawingChanged(this.props.drawing.id, {
      x: d.x,
      y: d.y
    });
  }

  _handleResize = (e, dir, ref, delta, pos) => { //update context for width, height, path, position
    this.props.drawingChanged(this.props.drawing.id, {
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      ...pos
    });
  };

  render() {
    const drawing = this.props.drawing;
    const {width, height, x, y, nativeWidth, nativeHeight} = drawing;

    return(
      <StyledRnd
        size={{width, height}}
        position={{x, y}}
        onDragStop={this._handleDragStop}
        onResize={this._handleResize}
        bounds="parent"
      >
        <StyledSVG
          width={width}
          height={height}
          viewBox={`0 0 ${nativeWidth} ${nativeHeight}`}
          preserveAspectRatio="none"
        >
          <Defs />
          <path d={drawing.path} filter="url(#svg-shadow)" />
        </StyledSVG>
      </StyledRnd>
    );
  }
}

const Defs = () => (
  <defs>
    <filter id="svg-shadow" x="0" y="0" width="120%" height="120%">
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
);
