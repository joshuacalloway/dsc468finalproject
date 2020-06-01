import React, { useRef, useEffect, useState } from 'react';

import State from './State'
import json from './us-states.json'
import stateCodes from './state-codes.json'
import styled from 'styled-components';

import * as d3 from 'd3'

const USA = ({ width, height, result, tooltipsEnabled }) => {
    const [resultByState, setResultByState] = useState(null)

    useEffect(() => {
        console.log("USA, result is ", result)
        if (result) {
            setResultByState( new Map(result.map(i => [i.state, i])))
        }
    }, [result])

    const svg = useRef()
    const states = ['Wyoming', 'Washington', 'Alaska', 'Colorado', 'Florida', 'North Carolina', 'South Carolina', 'Virginia', 'New Hampshire', 'Iowa', 'Nebraska', 'Louisiana', 'Delaware', 'Arizona', 'Arkansas', 'Connecticut', 'South Dakota', 'North Dakota', 'Kentucky', 'Michigan', 'Pennsylvania', 'Maine', 'Vermont', 'Massachusetts', 'Maryland', 'Mississippi', 'New Mexico', 'Connecticut', 'Rhode Island', 'West Virginia', 'Wisconsin', 'Puerto Rico', 'District of Columbia', 'Hawaii', 'Nevada', 'Oregon', 'Idaho', 'Ohio', 'Minnesota', 'Utah', 'Montana', 'Minnesota', 'California', 'Texas', 'Illinois', 'Indiana', 'Georgia', 'Alabama', 'Missouri', 'Kansas', 'Tennessee', 'Oklahoma', 'New York']
    let projection = d3.geoAlbersUsa()
        .translate([width / 2, height / 2]) // translate to center of screen
        .scale([500]); // scale things down so see entire US

    // Define path generator
    let path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
        .projection(projection); // tell path generator to use albersUsa projection

    const findGeoJson = (state) => {
        return json.features.find(item => item.properties.name == state)
    }

    const findStateCodeByName = (name) => {
        const found = stateCodes.find(mapping => mapping.name == name)
        if (found) {
            return found.abbreviation
        }
        return ''
    }

    const getColorFunction = () => {
        const bloodRed = '#9b0000'
        let lowColor = '#ffffff';
        let highColor = bloodRed;
        let maxVal = 100000;
        let colorFunction = d3.scaleLog().clamp(true).domain([0.1, maxVal]).range([lowColor, highColor])
        return colorFunction
    }
    const drawEachState = (state) => {
        const geojson = findGeoJson(state);
        const name = geojson.properties.name
        const stateCode = findStateCodeByName(name)
        let result = { death: 0, positive: 0, recovered: 0 }
        if (resultByState && resultByState.has(stateCode)) {
            result = resultByState.get(stateCode)
        }
        return <State tooltipsEnabled={tooltipsEnabled} result={result} svg={svg} path={path} name={name} geojson={geojson} colorFunction={getColorFunction()} />
    }

    return (
        <>
        <StyledSVG id="USA" ref={svg} width={width} height={height}>
                <g>
                    {states.map(state => drawEachState(state))}
                </g>
        </StyledSVG>
        </>
    );
}

export default USA
const StyledSVG = styled.svg`
    border:1px solid purple;
    width: 100%;
    height: 100%; 

`