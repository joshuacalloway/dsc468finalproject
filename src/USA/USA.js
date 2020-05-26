import React, { useRef, useState } from 'react';

import State from './State'
import json from './us-states.json'
import Switch from 'react-input-switch';
import styled from 'styled-components';

import * as d3 from 'd3'

import createSummaryFromConfirmedJson from '../USHeatmap/createSummaryFromConfirmedJson'

const USA = ({ onClick, covidjson }) => {
    const { summary, colorFunction } = createSummaryFromConfirmedJson(covidjson)
    const canvasRef = useRef();
    const svg = useRef()
    const states = ['Wyoming', 'Washington', 'Alaska', 'Colorado', 'Florida', 'North Carolina', 'South Carolina', 'Virginia', 'New Hampshire', 'Iowa', 'Nebraska', 'Louisiana', 'Delaware', 'Arizona', 'Arkansas', 'Connecticut', 'South Dakota', 'North Dakota', 'Kentucky', 'Michigan', 'Pennsylvania', 'Maine', 'Vermont', 'Massachusetts', 'Maryland', 'Mississippi', 'New Mexico', 'Connecticut', 'Rhode Island', 'West Virginia', 'Wisconsin', 'Puerto Rico', 'District of Columbia', 'Hawaii', 'Nevada', 'Oregon', 'Idaho', 'Ohio', 'Minnesota', 'Utah', 'Montana', 'Minnesota', 'California', 'Texas', 'Illinois', 'Indiana', 'Georgia', 'Alabama', 'Missouri', 'Kansas', 'Tennessee', 'Oklahoma', 'New York']
    const [tooltipsEnabled, setTooltipsEnabled] = useState(true);
    const enableTooltipToggleButton = <Switch on={true} value={tooltipsEnabled} onChange={setTooltipsEnabled} />;

    let width = 960;
    let height = 500;
    let projection = d3.geoAlbersUsa()
        .translate([width / 2, height / 2]) // translate to center of screen
        .scale([1000]); // scale things down so see entire US

    // Define path generator
    let path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
        .projection(projection); // tell path generator to use albersUsa projection

    const findGeoJson = (state) => {
        return json.features.find(item => item.properties.name == state)
    }

    const drawEachState = (state) => {
        const geojson = findGeoJson(state);
        const name = geojson.properties.name

        return <State tooltipsEnabled={tooltipsEnabled} svg={svg} path={path} name={name} geojson={geojson} confirmed={summary[name]} colorFunction={colorFunction} />
    }

    return (
        <StyledDiv>
            <div><div className={"label"}>Enable or Disable Tooltips </div> {enableTooltipToggleButton}</div>
            <div ref={canvasRef} onClick={onClick}>
                <svg ref={svg} width={960} height={500}>
                    <g>
                        {states.map(state => drawEachState(state))}
                    </g>
                </svg>

            </div>
        </StyledDiv>
    );
}

export default USA
const StyledDiv = styled.div`
    .label {
        font-size: 1rem;
        display: table-cell;
    }
    label {
        display: table-cell;

    }
`