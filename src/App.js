import React from 'react';
import Logo from './logo/Logo.js';
import './App.css';
import BarChart from './BarChart'
import SimplePolygon from './SimplePolygon'
import CallingSageMaker from './CallingSageMaker'
import USHeatmap from './USHeatmap/USHeatmap'
import DrawFromGeoJson from './USHeatmap/DrawFromGeoJson'
import geojson from './USHeatmap/us-states.json';
import covidjson from './USHeatmap/confirmed.json';

import createSummaryFromConfirmedJson from './USHeatmap/CreateSummaryFromConfirmedJson'


function App() {

  const summary = createSummaryFromConfirmedJson(covidjson)
  
  console.log("in App, summary is ", summary)

  return (
    <div className="App">
      <header className="App-header">
        <h1>This is a US Heat Map</h1>
        <USHeatmap />

        <h1>This is Drawing one country from GeoJSON</h1>

        <DrawFromGeoJson geojson={geojson} covidjson={covidjson}/>

        <p/>
        <p/>
        <h1>Here's a newbie D3 polygon</h1>
        <SimplePolygon />

        <h1>Here's a newbie D3 barchart</h1>
        <BarChart />

        <h1>This is example of calling SageMaker</h1>
        <CallingSageMaker />
        {/* <img src={logo} className="App-logo" alt="logo" />  */}
        <h1> this is a logo</h1>
        <Logo />
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
