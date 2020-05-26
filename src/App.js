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
import createSummaryFromConfirmedJson from './USHeatmap/createSummaryFromConfirmedJson'
import Map from './Map'
import USA from './USA'

function App() {

  const { summary, colorFunction } = createSummaryFromConfirmedJson(covidjson)


  return (
    <div id="theApp" className="App">
      <header className="App-header">
        <p>This is USA</p>
        <USA covidjson={covidjson} onClick={() => alert('clicked USA')} />
        <h1>This is a US Heat Map</h1>
        <USHeatmap summary={summary} onClick={() => { console.log("we clicke USA")}}/>

        <h1>This is Drawing one country from GeoJSON</h1>

        <DrawFromGeoJson geojson={geojson} covidjson={covidjson} onClick={() => alert("clicked DrawFrom GeoJson")} />

        <h1>This is a Leaflef Map</h1>
        <Map />

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
