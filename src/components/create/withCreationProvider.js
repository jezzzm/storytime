import React, { Component } from 'react';
import CreationContext from './CreationContext';
import { withFirebase } from '../../firebase';

const INITIAL_STATE = {
  drawingsIndex: null,
  title: '',
  pages: [{
    text:'',
    drawings: {}
  }],
  id: null
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

    updatePages = pages => this.setState({pages: pages})
    updateID = id => this.setState({id: id})
    updateTitle = title => this.setState({title: title})

    clearCreation = () => {
      this.setState({
        ...INITIAL_STATE,
        drawingsIndex: this.state.drawingsIndex
      })
    }

    render() {
      return (
        <CreationContext.Provider
          value={{
            ...this.state,
            updatePages: pages => this.updatePages(pages),
            clearCreation: this.clearCreation,
            updateID: id => this.updateID(id),
            updateTitle: title => this.updateTitle(title)
          }}>
          <InnerComponent {...this.props} />
        </CreationContext.Provider>
      );
    }
  }

  return withFirebase(WithCreationProvider);
};

export default withCreationProvider;
