import React, { useState, useEffect } from 'react';
import './App.css';
import BarChart from './BarChart'
import SimplePolygon from './SimplePolygon'
import DrawFromGeoJson from './USHeatmap/DrawFromGeoJson'
import geojson from './USHeatmap/us-states.json';
import covidjson from './USHeatmap/confirmed.json';
import Map from './Map'
import USA from './USA'
import { fetchCurrentCovid19 } from './data'

function App() {

  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCurrentCovid19(setError, setResult)
  }, []);

  return (
    <div id="theApp" className="App">
      <header className="App-header">
        <p>This is USA</p>
        <USA result={result} onClick={() => alert('clicked USA')} />

        <h1>This is Drawing one country from GeoJSON</h1>

        <DrawFromGeoJson geojson={geojson} covidjson={covidjson} onClick={() => alert("clicked DrawFrom GeoJson")} />

        <h1>This is a Leaflef Map</h1>
        <Map />

        <h1>Here's a newbie D3 polygon</h1>
        <SimplePolygon />

        <h1>Here's a newbie D3 barchart</h1>
        <BarChart />

      </header>
    </div>
  );
}

export default App;
