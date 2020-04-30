import React from 'react';
import Logo from './logo/Logo.js';
import './App.css';
import BarChart from './BarChart'
import SimplePolygon from './SimplePolygon'
import CallingSageMaker from './CallingSageMaker'

function App() {

  return (
    <div className="App">
      <header className="App-header">
      <h1>this is third change</h1>
      <h1>this is new change to demo how to do it</h1>
      <h1>Here's a newbie D3 polygon</h1>
        <SimplePolygon/>

        <h1>Here's a newbie D3 barchart</h1>
        <BarChart/>

        <h1>This is example of calling SageMaker</h1>
        <CallingSageMaker/>
         {/* <img src={logo} className="App-logo" alt="logo" />  */}
         <h1> this is a logo</h1>
         <Logo/>

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
