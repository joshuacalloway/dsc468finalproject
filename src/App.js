import React, {useState} from 'react';
import Logo from './logo/Logo.js';
import './App.css';
import BarChart from './BarChart'
import SimplePolygon from './SimplePolygon'
import CallingSageMaker from './CallingSageMaker'
import USHeatmap from './USHeatmap/USHeatmap'
import DrawFromGeoJson from './USHeatmap/DrawFromGeoJson'
import geojson from './USHeatmap/us-states.json';
import hexagon_json from './HexagonMap/us_states_hexgrid.geojson.json'
import covidjson from './USHeatmap/confirmed.json';
import { State } from './State'
import TexasGeoJson from './USHeatmap/Texas.json'
import createSummaryFromConfirmedJson from './USHeatmap/createSummaryFromConfirmedJson'
import Map from './Map'
import HexagonMap from './HexagonMap/index.js';
import BubblePlot from './BubblePlot/BubblePlot.js'
import Bubble from './BubblePlot/Bubble.js';
import Switch from 'react-input-switch'


function App() {

  const test_data = [{ state: "IL", comfirmed: 5, death:30, recovery:40 }, { state: "CA", comfirmed: 10, death:70, recovery:30 }]
  
  const { summary, colorFunction } = createSummaryFromConfirmedJson(covidjson)
  const texasConfirmed = summary.Texas;
  console.log("in App, summary is ", summary)
  console.log("in App, colorFunction is ", colorFunction)
  const [tooltipsEnabled, setTooltipsEnabled] = useState(true);
  const enableTooltipToggleButton = <Switch value={tooltipsEnabled} onChange={setTooltipsEnabled} />;

  return (
    <div className="App">
      <header className="App-header">
        <p>This is Texas</p>
        <State geojson={TexasGeoJson} confirmed={texasConfirmed} colorFunction />

        <h1>This is a US Heat Map</h1>
        <USHeatmap />
        <div onMouseEnter={(e) => { console.log('aaa', e.pageX,'ya',e.pageY)}}>
        debugging Tooltips
        </div>
        <h1>This is Drawing one country from GeoJSON</h1>
        <DrawFromGeoJson geojson={geojson} covidjson={covidjson} />

        <h1>This is a Leaflef Map</h1>
        <Map />

        <h1>This is interactiive Hexagon Map</h1>
        <HexagonMap geojson={hexagon_json} covidjson={covidjson} />
        
        <h1>This is a bubble plot</h1>
        <div id="bubble_chart">
          {/* <text>Enable or Disable Tooltips {enableTooltipToggleButton}</text> */}
          <BubblePlot data={test_data} width={600} height={500} />
        </div>

       
        {/* {/* <h1>Here's a newbie D3 polygon</h1> */}
        <SimplePolygon />

        <h1>Here's a newbie D3 barchart</h1>
        <BarChart /> */}

        <h1>This is example of calling SageMaker</h1>
        <CallingSageMaker />
        
        {/* <img src={logo} className="App-logo" alt="logo" /> 
        <h1> this is a logo</h1> */}
        {/* <Logo /> */}
        
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
