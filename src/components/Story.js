import React from 'react';

//routes
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

//context
import { withAccess } from './auth/authContext';

const Story = props => (
  <div>
    <h1>Story</h1>
    <Link to={`${ROUTES.STORIES}/${props.match.params.storyid}/edit`}>Edit Story</Link>
    {props.match.params.storyid}
  </div>
);

export default withAccess()(Story);
