import React, {
  useEffect,
  useRef,
  useState
} from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import usstates from './us-states.json';

const USHeatmap = ({summary, onClick}) => {
  const [covidResult, setCovidResult] = useState(null);

  console.log("USHeatMap, onClick is ", onClick)
  // only 182B in size
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    drawUnitedStatesFromGeoJson(summary)
  });
  const canvasRef = useRef();


  const drawUnitedStatesFromGeoJson = (summary) => {
    const canvasHeight = 400
    const canvasWidth = 600
    const scale = 20
    const svgCanvas = d3.select(canvasRef.current)
      .append("svg")
      .attr("onclick", "alert('clicked svg')")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)
      .style("border", "1px solid black")
    console.log("usstates", usstates)

    let width = 960;
    let height = 500;

    let lowColor = '#f9f9f9';
    let highColor = '#bc2a66';

    let minVal = d3.min([0]);
    let maxVal = d3.max([5033]);
    let color = d3.scaleLinear().domain([minVal, maxVal]).range([lowColor, highColor])
    // D3 Projection
    let projection = d3.geoAlbersUsa()

      .translate([width / 2, height / 2]) // translate to center of screen
      .scale([1000]) // scale things down so see entire US

    // Define path generator
    let path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
      .projection(projection); // tell path generator to use albersUsa projection

    let svg = d3.select(canvasRef.current)
      .append('svg')
      .attr("onclick", "alert('clicked svg 2')")
      .attr("onClick", "alert('clicked svg 3')")

      .attr('width', width)
      .attr('height', height);
    console.log(usstates.features);
  }

  return <div ref={canvasRef} onClick={onClick}></div>;
}
export default USHeatmap

const StyledDiv = styled.div`
/* Legend Font Style */
.canvas {
	font: 11px sans-serif;
	background-color: #ffffff;
}
        
/* Legend Position Style */
.legend {
	position:absolute;
	left:20px;
	top:30px;
}

.axis text {
	font: 10px sans-serif;
}

.axis line, .axis path {
	fill: none;
	stroke: #000;
	shape-rendering: crispEdges;
}
}`