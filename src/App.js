import React, { Component } from 'react';
import Recycling from './Recycling.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Seattle Recycling Rates</h1>
        </header>
        <p className="App-intro">Compare Seattle Recycling rates for 2003-2015</p>
        < Recycling />
      </div>
    );
  }
}

export default App;
