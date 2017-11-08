import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import ViewPanel from '../components/view-panel';
import InteractionPanel from '../components/interaction-panel';
import './app.css';

class App extends React.Component {

  render() {
    const { stack, result, actions } = this.props;
    return (
      <div className="fluid-container app">
        <ViewPanel stack={stack} result={result} />
        <InteractionPanel stack={stack} {...actions} />
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  const { stack, result } = state;
  return { stack, result };
}
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(App); 