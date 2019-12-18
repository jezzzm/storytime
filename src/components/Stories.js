import React, { Fragment } from 'react';
import { withAuth } from './auth/authContext'
import styled from '@emotion/styled';

//components
import BlueSpinner from './app/BlueSpinner';

//TODO: trigger recheck on component mount
const Stories = props => (
  <Fragment>
    {props.authUser ? (
      <StoriesLoaded stories={props.authUser.userStories} />
    ) : (
      <StoriesNotLoaded />
    )}
  </Fragment>
);


const StoriesLoaded = props => {
  const stories = Object.values(props.stories);
  return (
    <div>
      <h1>Creations</h1>
      <table>
      <thead>
      </thead>
      <tbody>
        {stories.map((s, i) => (
          <tr key={i}>
            <td>{s.title ? s.title : 'Untitled'}</td>
            <td>datetime created</td>
            <td>datetime modified</td>
            <td>{Object.keys(s.pages).length} pages</td>
            <td>Link</td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
}


const StoriesNotLoaded = () => (
  <div>
    <h1>Creations</h1>
    <BlueSpinner />
  </div>
)

export default withAuth(Stories);
