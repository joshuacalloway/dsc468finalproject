import React from 'react';
import Logo from './logo/Logo.js';
import './App.css';
import BarChart from './BarChart'
import SimplePolygon from './SimplePolygon'
import CallingSageMaker from './CallingSageMaker'
import USHeatmap from './USHeatmap/USHeatmap'
import DrawFromGeoJson from './USHeatmap/DrawFromGeoJson'
import geojson from './USHeatmap/us-states.json';
import covidjson from './Data/confirmed.json';
import { State } from './State'
import TexasGeoJson from './USHeatmap/Texas.json'
import createSummaryFromJson from './USHeatmap/createSummaryFromJson'
import createDateSummary from './LineChart/createDateSummary'
import deathjson from './Data/deaths.json';
import recoveredjson from './Data/recovered.json';
import DrawFromLine from './LineChart/DrawFromLine';

function App() {

  const { summary, colorFunction } = createSummaryFromJson(covidjson,'confirmed')
  const texasConfirmed = summary.Texas;
 
  const deathDateSummary=createDateSummary(deathjson,'deaths');
  //console.log('death summary is ',deathDateSummary);
  const confirmedDateSummary=createDateSummary(covidjson,'confirmed');
  //console.log('confirmed summary is ',confirmedDateSummary);
  const recoveredDateSummary=createDateSummary(recoveredjson,'recovered');
  //console.log('recovered summary is ',recoveredDateSummary);



  return (
    <div className="App">
      <header className="App-header">
        <p>This is Texas</p>
        <State geojson={TexasGeoJson} confirmed={texasConfirmed} colorFunction />

        <h1>This is a US Heat Map</h1>
        <USHeatmap />

        <h1>This is Drawing one country from GeoJSON</h1>

        <DrawFromGeoJson geojson={geojson} covidjson={covidjson} />

        <h1>This is a Line Chart</h1>
        <DrawFromLine confirmedDateSummary={confirmedDateSummary} deathsDateSummary={recoveredDateSummary} recoveredDateSummary={deathDateSummary} />

        <p />
        <p />
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
