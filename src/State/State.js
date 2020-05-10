import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3'

const State = ({ geojson, confirmed, colorFunction }) => {

    const canvasRef = useRef();

    useEffect(() => {
        drawMapFromJson(geojson, confirmed, colorFunction)
    });

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
            .style("fill", "red" )
            // .style("fill", function (d) {
            //     return colorFunction(d.properties.value)
            // });
    }
    return <div ref={canvasRef}></div>;
}

export default State