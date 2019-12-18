import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

const Story = props => (
  <div>
    <h1>Story</h1>
    <Link to={`${ROUTES.STORIES}/${props.match.params.storyid}/edit`}>Edit Story</Link>
    {props.match.params.storyid}
  </div>
);

export default Story;
