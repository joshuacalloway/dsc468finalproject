import React, { useRef, useState, useEffect } from 'react';

import State from './State'

import TexasGeoJson from './Texas.json'
import IllinoisGeoJson from './Illinois.json'
import IndianaGeoJson from './Indiana.json'

import * as d3 from 'd3'

import createSummaryFromConfirmedJson from '../USHeatmap/createSummaryFromConfirmedJson'

const USA = ({onClick, covidjson}) => {
    const { summary, colorFunction } = createSummaryFromConfirmedJson(covidjson)
    const canvasRef = useRef();
    const [svg, setSvg] = useState(null)
    const [states, setStates] = useState([])

    useEffect(() => {
        let width = 960;
        let height = 500;
        let svg = d3.select(canvasRef.current)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append("g")
        setSvg(svg);
        let projection = d3.geoAlbersUsa()
        .translate([width / 2, height / 2]) // translate to center of screen
        .scale([1000]); // scale things down so see entire US

// Define path generator
let path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
   .projection(projection); // tell path generator to use albersUsa projection


        const texasConfirmed = summary.Texas;
        const illinoisConfirmed = summary.Illinois;
        const indianaConfirmed = summary.Indiana;

        const texas = <State svg={svg} path={path} geojson={TexasGeoJson} confirmed={texasConfirmed} colorFunction onClick={onClick}/>
        const illinois = <State svg={svg} path={path} geojson={IllinoisGeoJson} confirmed={illinoisConfirmed} colorFunction onClick={onClick}/>
        const indiana = <State svg={svg} path={path} geojson={IndianaGeoJson} confirmed={indianaConfirmed} colorFunction onClick={onClick}/>

        setStates([illinois, texas, indiana])
    }, [onClick, summary.Illinois, summary.Indiana, summary.Texas] );


    return <div ref={canvasRef} onClick={onClick}>{states}</div>;
}

export default USA