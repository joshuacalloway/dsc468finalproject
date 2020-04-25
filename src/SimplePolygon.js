import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3'
import styled from 'styled-components';

const SimplePolygon = () => {

     // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        drawPolygon()
    });
    const canvasRef = useRef();

    const drawPolygon = (data) => {
        var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
      
        var svg = d3.select(canvasRef.current).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
      
      
      var x = d3.scaleLinear().range([0, 500]);
        var y = d3.scaleLinear().range([500, 0]);
      
      x.domain([0, 50]);
      y.domain([0, 50]);
      
      var point = {"x": 24, "y": 31}
      
      var poly = [{"x":10, "y":50},
            {"x":20,"y":20},
            {"x":50,"y":10},
            {"x":30,"y":30},
          {"x":40,"y":50}];
      
      
      svg.selectAll("polygon")
        .data([poly])
      .enter().append("polygon")
        .attr("points",function(d) { 
            return d.map(function(d) {
                return [x(d.x),y(d.y)].join(",");
            }).join(" ");
        });
      
      svg.append("circle")
        .attr("r", 4)
        .attr("cx", x(point.x))
        .attr("cy", y(point.y))
      
        // add the X Axis
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    
      // add the Y Axis
      svg.append("g")
        .call(d3.axisLeft(y));
    }
    return <StyledDiv ref={canvasRef}></StyledDiv>;
}
const StyledDiv = styled.div`    
    polygon { 
<<<<<<< HEAD
        fill: green 
=======
        fill: Red 
>>>>>>> 7bae35d3044e5e9b647b5a760a842466cceb4ab3
    }
`;

export default SimplePolygon;
