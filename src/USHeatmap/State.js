import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3'
import styled from 'styled-components';
// json is GeoJSON --- Geography 
// geojson is is the united states data and covidjson is the data from api
const State = ({ geojson, confirmed, colorRange }) => {

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        drawMapFromJson(geojson, confirmed, colorRange)

    });
    const canvasRef = useRef();

    const drawMapFromJson = (geojson, confirmed, colorRange) => {

        //Width and height of map
        let width = 960;
        let height = 500;

        let svg = d3.select(canvasRef.current)
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        // D3 Projection
        let projection = d3.geoAlbersUsa()
            .translate([width / 2, height / 2]) // translate to center of screen
            .scale([1000]); // scale things down so see entire US


        // Define path generator
        let path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
            .projection(projection); // tell path generator to use albersUsa projection

        svg.selectAll("path")
            .data(geojson.features)
            .enter()
            .append('path')
            .attr("d", path)
            .style("stroke", "black")
            .style("stroke-width", "1")
            .style("fill", function (d) {
                return colorRange(d.properties.value)
            });
    }
    return <div ref={canvasRef}></div>;
}


export default State
