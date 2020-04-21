import React from 'react';
import logo from './logo.svg';
import './App.css';
import BarChart from './BarChart'
import SimplePolygon from './SimplePolygon'

function App() {

  return (
    <div className="App">
      <header className="App-header">
      <h1>this is new change to demo how to do it</h1>
      <h1>Here's a newbie D3 polygon</h1>
        <SimplePolygon/>

        <h1>Here's a newbie D3 barchart</h1>
        <BarChart/>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
