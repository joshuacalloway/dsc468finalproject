import React from 'react';
import './App.css';





import Combined from './combined';

import geojson from './Data/us_states_geojson.json';




function App() {

  
  return (
    <div className="App">
      <header className="App-header">
        


        <h1>This is Map , Chart and scatter plot</h1>
        <Combined geojson={geojson} ></Combined>

        

        {/* <h1>This is a US Heat Map</h1>
        <USHeatmap />

        <h1>This is Drawing one country from GeoJSON</h1>

        <DrawFromGeoJson geojson={geojson} covidjson={covidjson} />

        <h1>This is a Status Summary Line Chart</h1>
        <DrawFromLine confirmedDateSummary={confirmedDateSummary} deathsDateSummary={recoveredDateSummary} recoveredDateSummary={deathDateSummary} />

        <h1>This is a State Summary Line chart</h1>
        <DrawStateLine data={totalStateSummary} /> */}
        
        
        

        

        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
         
        </a>
      </header>
    </div>
  );
}

export default App;
