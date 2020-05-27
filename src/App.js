import React from 'react';
import Logo from './logo/Logo.js';
import './App.css';

import CallingSageMaker from './CallingSageMaker'


import covidjson from './Data/confirmed.json';


import createDateSummary from './LineChart/createDateSummary'
import deathjson from './Data/deaths.json';
import recoveredjson from './Data/recovered.json';

import Combined from './combined';

import geojson from './Data/us_states_geojson.json';




function App() {

  
  return (
    <div className="App">
      <header className="App-header">
        


        <h1>This is Map , Chart and scatter plot</h1>
        <Combined geojson={geojson} covidjson={covidjson} deaths={deathjson} recovered={recoveredjson}></Combined>

        

        {/* <h1>This is a US Heat Map</h1>
        <USHeatmap />

        <h1>This is Drawing one country from GeoJSON</h1>

        <DrawFromGeoJson geojson={geojson} covidjson={covidjson} />

        <h1>This is a Status Summary Line Chart</h1>
        <DrawFromLine confirmedDateSummary={confirmedDateSummary} deathsDateSummary={recoveredDateSummary} recoveredDateSummary={deathDateSummary} />

        <h1>This is a State Summary Line chart</h1>
        <DrawStateLine data={totalStateSummary} /> */}
        
        
        

        

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
