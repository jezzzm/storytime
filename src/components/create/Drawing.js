import React, { Component } from 'react';
import styled from '@emotion/styled';
import { Rnd } from 'react-rnd';

const StyledSVG = styled.svg`
  stroke: #222;
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
    this.props.drawingChanged(this.props.drawing.id, {
      path: this.buildPath()
    });
  }

  buildPath() {
    let data = '';
    const drawing = this.props.drawing
    const coords = drawing.coords;

    //check limit of points to strip svg bounding box to better match the shape
    // let usedHeight = 0;
    // let usedWidth = 0;
    // let drawingPoints = []
    //iterate through coord pairs to generate SVG path string
    for (let stroke in coords) {
      let pathSegment = 'M'
      let strokeArray = Object.values(coords[stroke])[0];
      // let strokePoints = []
      strokeArray.forEach((p, i) => {
        // if (p.x > usedWidth) usedWidth = p.x;
        // if (p.y > usedHeight) usedHeight = p.y;

        const newX = p.x/250 * drawing.width + 10;
        const newY = p.y/250 * drawing.height + 10;

        //we already have the Move key for the first pair
        if (i !== 0) pathSegment += 'L';

        // strokePoints.push([p.x, p.y])
        pathSegment += newX + ',' + newY

        if (i !== strokeArray.length - 1) pathSegment += ',';

      });

      data += pathSegment
      // drawingPoints.push(strokePoints)
    }
    return data;
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
      path: this.buildPath(),
      ...pos
    });
  };

  render() {
    const drawing = this.props.drawing;
    const widthSVG = drawing.width + 30;
    const heightSVG = drawing.height + 30;
    const widthRnd = drawing.width + 46;
    const heightRnd = drawing.height + 46;

    return(
      <StyledRnd
        size={{width: widthRnd, height: heightRnd}}
        position={{x: drawing.x, y: drawing.y}}
        onDragStop={this._handleDragStop}
        onResize={this._handleResize}
        bounds="parent"
      >
        <StyledSVG width={widthSVG} height={heightSVG}>
          <Defs />
          <path d={drawing.path} filter="url(#f2)" />
        </StyledSVG>
      </StyledRnd>
    );
  }
}

const Defs = () => (
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
);
