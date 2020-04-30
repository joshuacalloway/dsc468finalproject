import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3'

const BarChart = () => {

     // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        const data = [ 2, 4, 2, 6, 8, 10,12]
        drawBarChart(data)
    });
    const canvasRef = useRef();

    const drawBarChart = (data) => {
        const canvasHeight = 400
        const canvasWidth = 600
        const scale = 20
        const svgCanvas = d3.select(canvasRef.current)
                            .append("svg")
                            .attr("width", canvasWidth)
                            .attr("height", canvasHeight)
                            .style("border", "1px solid black")
        svgCanvas.selectAll("rect")
                    .data(data).enter()
                    .append("rect")
                    .attr("width", 40)
                    .attr("height", (datapoint) => datapoint * scale)
                    .attr("fill", "orange")
                    .attr("x", (datapoint, iteration) => iteration * 45)
                    .attr("y", (datapoint) => canvasHeight - datapoint * scale)
    }
    return <div ref={canvasRef}></div>;
}
export default BarChart