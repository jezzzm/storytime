import React, {Fragment } from 'react';

//components
import Create from './create/Create';

const Edit = (props) => {
  const storyid = props.match.params.storyid;
  return (
    <Fragment>
      <p>Editing {storyid}</p>
      <Create story={storyid}/>
    </Fragment>
  );
}

export default Edit;
