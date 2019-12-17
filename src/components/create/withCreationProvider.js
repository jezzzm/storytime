import React, { Component } from 'react';
import CreationContext from './CreationContext';
import { withFirebase } from '../../firebase';

const withCreationProvider = InnerComponent => {
  class WithCreationProvider extends Component {
    constructor(props) {
      super(props);
      this.state = {
        drawingsIndex: null,
        drawings: {}
      };
    }

    async componentDidMount() {
      //get current list of words from db
      let drawings = [];
      await this.props.firebase.getAllDrawings().then(doc => {
        this.setState({drawingsIndex: doc.data().values})
      });
    }

    updateDrawings = (drawings) => {
      this.setState({drawings: drawings})
    }

    render() {
      return (
        <CreationContext.Provider
          value={{
            ...this.state,
            updateDrawings: drawings => this.updateDrawings(drawings)
          }}>
          <InnerComponent {...this.props} />
        </CreationContext.Provider>
      );
    }
  }

  return withFirebase(WithCreationProvider);
};

export default withCreationProvider;
