import React, { Fragment } from 'react';

//routes
import * as ROUTES from '../constants/routes';

//styles
import * as S from '../constants/style';
import styled from '@emotion/styled';
import Moment from 'react-moment';

//components
import SpinnerBlue from './general/SpinnerBlue';
import { Link } from 'react-router-dom';
import Container from './general/Container';
import ButtonBlue from './general/ButtonBlue';
import Heading from './general/Heading';

//context
import { withAuth, withAccess } from './auth/authContext'

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: ${S.COPY};
  text-align: center;
  font-size: 1.1em;
  th {
    vertical-align: bottom;
    border: 0;
    border-bottom: 2px solid rgba(255,255,255, 0.3);
  }
  th, td {
    padding: 1.5rem;
  }
  th.left, td.left {
    text-align: left;
  }
  td {
    border-top: 1px solid rgba(255,255,255,0.2);
  }
  tbody {
    border: 0;
  }
`;


const Stories = props => {
  return (
    <Container>
      <Heading>My Stories</Heading>
      {props.authUser.stories ? (
        <StoriesLoaded stories={props.authUser.stories} />
      ) : (
        <SpinnerBlue />
      )}
    </Container>
  );
}


const StoriesLoaded = props => {
  const stories = props.stories;
  const storyKeys = Object.keys(props.stories);

  return (
    <StyledTable>
      <thead>
        <tr>
          <th className="left">Title</th>
          <th>Created</th>
          <th>Updated</th>
          <th>Pages</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {storyKeys.map((id, i) => (
          <tr key={i}>
            <td className="left"><strong>{stories[id].title ? stories[id].title : 'Untitled'}</strong></td>
            <td><Moment format="YYYY/MM/DD" date={stories[id].created} /></td>
            <td><Moment format="YYYY/MM/DD" date={stories[id].modified} /></td>
            <td>{Object.keys(stories[id].pages).length}</td>
            <td><ButtonBlue to={ROUTES.STORIES + '/' + id + '/edit'}>View/Edit</ButtonBlue></td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}

export default withAccess()(withAuth(Stories));
