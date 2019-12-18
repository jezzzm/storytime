import React, {Fragment, Component} from 'react';

//components
import Create from './create/Create';

//context
import {withFirebase} from '../firebase'
import {withCreation} from './create/CreationContext';


const Edit = (props) => {
  const storyid = props.match.params.storyid;

  const componentDidMount = () => {

  }

  return (
    <Fragment>
      <p>Editing {storyid}</p>
      <Create story={storyid}/>
    </Fragment>
  );
}

export default Edit;
