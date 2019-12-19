import React, {Fragment } from 'react';

//components
import Create from './create/Create';

const Edit = (props) => {
  const storyid = props.match.params.storyid;
  return <Create story={storyid}/>;
}

export default Edit;
