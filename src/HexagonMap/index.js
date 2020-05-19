import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3'

function HexagonMap() {

    useEffect(() => { //call component 
        DrawMap()
    })
    const canvasRef = useRef(); // reference
    function DrawMap() {
        d3.select(canvasRef.current)
            .append("svg")
            .attr("id", "hexagon_map")
            .attr("width", "440")
            .attr("height", "300")
    
        const svg = d3.select("#hexagon_map")
        //   width = +svg.attr("width"),
        //   height = +svg.attr("height");

        // Map and projection
        const projection = d3.geoMercator()
            .scale(350) // This is the zoom
            .translate([850, 440]); // You have to play with these values to center your map

        // Path generator
        const path = d3.geoPath()
            .projection(projection)
        
        // Load external data and boot
        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/us_states_hexgrid.geojson.json").then(function (data) {
            //console.log(data)
        
        
            //Draw the map
            svg.append("g")
                .text("hello")
                .selectAll("path")
                .data(data.features)
                .enter()
                .append("path")
                .attr("fill", "#69a2a2")
                .attr("d", path)
                .attr("stroke", "white")

            // Add the labels
            svg.append("g")
                .selectAll("labels")
                .data(data.features)
                .enter()
                .append("text")
                .attr("x", function (d) { return path.centroid(d)[0] })
                .attr("y", function (d) { return path.centroid(d)[1] })
                .text(function (d) { return d.properties.iso3166_2 })
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "central")
                .style("font-size", 11)
                .style("fill", "white")
        })
       // })
    }
    
    return (<div ref={canvasRef}></div>)

}

export default HexagonMap