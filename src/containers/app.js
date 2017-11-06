import React from 'react';
import { connect } from 'react-redux';

import ViewPanel from './view-panel';
import InteractionPanel from './interaction-panel';
import './app.css';

class App extends React.Component {

  render() {
    return (
      <div className="fluid-container app">
        <ViewPanel />
        <InteractionPanel />
      </div>
    );
  };
}

export default connect()(App); 