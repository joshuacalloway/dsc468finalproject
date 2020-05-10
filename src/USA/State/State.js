import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3'

const State = ({ geojson, confirmed, colorFunction, onClick, svg, path }) => {

    const canvasRef = useRef();

    useEffect(() => {
        drawMapFromJson(geojson, svg, confirmed, colorFunction, path)
    });

    const drawMapFromJson = (geojson, svg, confirmed, colorRange, path) => {
     
     
        svg.selectAll("g")
            .data(geojson.features)
            .enter()
            .append('path')
            .attr("d", path)
            .style("stroke", "black")
            .style("stroke-width", "1")
            .style("fill", "red" )
    }
    return <div ref={canvasRef} onClick={onClick}></div>;
}

export default State