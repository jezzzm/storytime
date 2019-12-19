import React from 'react';

const SpinnerBlue = () => (
  <svg xmlns="http://www.w3.org/2000/svg" style={{margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto'}} width="60px" height="60px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <circle cx="50" cy="50" r="32" strokeWidth="8" stroke="#94c8fd" strokeDasharray="50.26548245743669 50.26548245743669" fill="none" strokeLinecap="round" transform="rotate(83.965 50 50)">
      <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
    </circle>
    <circle cx="50" cy="50" r="23" strokeWidth="8" stroke="#2690fa" strokeDasharray="36.12831551628262 36.12831551628262" strokeDashoffset="36.12831551628262" fill="none" strokeLinecap="round" transform="rotate(-83.965 50 50)">
      <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;-360 50 50"></animateTransform>
    </circle>
  </svg>
)

export default SpinnerBlue;
