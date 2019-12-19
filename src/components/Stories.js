import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import Moment from 'react-moment';
import * as ROUTES from '../constants/routes';

//components
import BlueSpinner from './app/BlueSpinner';
import { Link } from 'react-router-dom';

//context
import { withAuth, withAccess } from './auth/authContext'

const Stories = props => {
  return (
    <Fragment>
      {props.authUser.stories ? (
        <StoriesLoaded stories={props.authUser.stories} />
      ) : (
        <StoriesNotLoaded />
      )}
    </Fragment>
  );
}


const StoriesLoaded = props => {
  const stories = props.stories;
  const storyKeys = Object.keys(props.stories);

  return (
    <div>
      <h1>My Stories</h1>
      <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Created</th>
          <th>Updated</th>
          <th>Pages</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {storyKeys.map((id, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{stories[id].title ? stories[id].title : 'Untitled'}</td>
            <td><Moment format="YYYY/MM/DD" date={stories[id].created} /></td>
            <td><Moment format="YYYY/MM/DD" date={stories[id].modified} /></td>
            <td>{Object.keys(stories[id].pages).length}</td>
            <td><Link to={ROUTES.STORIES + '/' + id}>View</Link></td>
            <td><Link to={ROUTES.STORIES + '/' + id + '/edit'}>Edit</Link></td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
}


const StoriesNotLoaded = () => (
  <div>
    <h1>My Stories</h1>
    <BlueSpinner />
  </div>
)

export default withAccess()(withAuth(Stories));
