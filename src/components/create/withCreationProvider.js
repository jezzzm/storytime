import React, { Component } from 'react';
import CreationContext from './CreationContext';
import { withFirebase } from '../../firebase';

const INITIAL_STATE = {
  drawingsIndex: null,
  title: '',
  pages: [{
    text:'',
    drawings: {}
  }]
}

const withCreationProvider = InnerComponent => {
  class WithCreationProvider extends Component {
    constructor(props) {
      super(props);
      this.state = INITIAL_STATE;
    }

    async componentDidMount() {
      await this.props.firebase
        .getAllDrawings()
        .then(doc => {
          this.setState({drawingsIndex: doc.data().values})
        });
    }

    updatePages = pages => {
      this.setState({pages: pages})
    }

    clearPages = () => {
      this.setState({pages: INITIAL_STATE.pages})
    }

    render() {
      return (
        <CreationContext.Provider
          value={{
            ...this.state,
            updatePages: pages => this.updatePages(pages),
            clearPages: this.clearPages
          }}>
          <InnerComponent {...this.props} />
        </CreationContext.Provider>
      );
    }
  }

  return withFirebase(WithCreationProvider);
};

export default withCreationProvider;
