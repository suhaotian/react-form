import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import FormDemo from './Form/demo'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Form Demo</h2>
        </div>
        <p className="App-intro">
          This is in devloping.. the feature is that minimal render!
        </p>
        <FormDemo />
      </div>
    );
  }
}

export default App;
