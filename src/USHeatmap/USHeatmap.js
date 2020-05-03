import React, {
  useEffect,
  useRef,
  useState
} from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import usstates from './us-states.json';

const USHeatmap = () => {
  const [covidResult, setCovidResult] = useState(null);

  // only 182B in size
  const covidUrl = 'https://api.covid19api.com/country/US/status/confirmed/live';
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetchCovidDataFromUrl()
  });
  const canvasRef = useRef();

  const generateSummaryFromCovidData = (result) => {
    let summary = {};
    for (let i = 0; i < result.length; i++) {
      let data_point = result[i];
      if (data_point.Status == "confirmed") {
        if (data_point.Province in summary) {
          summary[data_point.Province] = summary[data_point.Province] + data_point['Cases'] + 1;
        } else {
          summary[data_point.Province] = data_point['Cases'] + 1;
          //console.log(data_point.Province.length);
        }
      }
    }
    delete summary[""];
    return summary;
  }
  const drawUnitedStatesFromGeoJson = (summary) => {
    const canvasHeight = 400
    const canvasWidth = 600
    const scale = 20
    const svgCanvas = d3.select(canvasRef.current)
      .append("svg")
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
      .scale([1000]); // scale things down so see entire US

    // Define path generator
    let path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
      .projection(projection); // tell path generator to use albersUsa projection

    let svg = d3.select(canvasRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // const states = Object.keys(summary);
    // const values = Object.values(summary);
   
   
    console.log(usstates.features);
    // for (let i = 0; i < states.length; i++) {

    //   // Grab State Name
    //   let State = states[i];

    //   // Grab data value
    //   let Value = values[i];

    //   // Find the corresponding state inside the GeoJSON
    //   for (let j = 0; j < json.features.length; j++) {
    //     let jsonState = json.features[j].properties.name;

    //     if (State == jsonState) {

    //       // Copy the data value into the JSON
    //       json.features[j].properties.value = Value;

    //       // Stop looking through the JSON
    //       break;
    //     }
    //   }

    // }
  }
  const fetchCovidDataFromUrl = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }

    }

    fetch(covidUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        const {
          errorMessage,
          errorType
        } = data;
        if (errorMessage) {
          setCovidResult(errorMessage)
          console.log(errorType)
        } else {
          console.log(data);
          const summary = generateSummaryFromCovidData(data);
          console.log("summary,", summary);
          drawUnitedStatesFromGeoJson(summary)
        }
      });
  }
  return <StyledDiv><div ref={canvasRef}></div></StyledDiv>;
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





/*  const update = function (result, canvasRef) {
   //console.log(result);
   let summary = {};
   for (let i = 0; i < result.length; i++) {
     let data_point = result[i];
     if (data_point.Status == "confirmed") {
       if (data_point.Province in summary) {
         summary[data_point.Province] = summary[data_point.Province] + data_point['Cases'] + 1;
       } else {
         summary[data_point.Province] = data_point['Cases'] + 1;
         //console.log(data_point.Province.length);
       }
     }
   }
   delete summary[""];

   states = Object.keys(summary);
   values = Object.values(summary);




   console.log(summary)
   //console.log(states);
   //console.log(values);
   //Width and height of map
   let width = 960;
   let height = 500;

   let lowColor = '#f9f9f9';
   let highColor = '#bc2a66';

   let minVal = d3.min(values);
   let maxVal = d3.max(values);
   let color = d3.scaleLinear().domain([minVal, maxVal]).range([lowColor, highColor])
   // D3 Projection
   let projection = d3.geoAlbersUsa()
     .translate([width / 2, height / 2]) // translate to center of screen
     .scale([1000]); // scale things down so see entire US

   // Define path generator
   let path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
     .projection(projection); // tell path generator to use albersUsa projection

   let svg = d3.select(canvasRef.current)
     .append('svg')
     .attr('width', width)
     .attr('height', height);

   d3.json("us-states.json")
     .then(function (json) {
       // Loop through each state data value in the .csv file
       console.log(json.features);
       for (let i = 0; i < states.length; i++) {

         // Grab State Name
         let State = states[i];

         // Grab data value
         let Value = values[i];

         // Find the corresponding state inside the GeoJSON
         for (let j = 0; j < json.features.length; j++) {
           let jsonState = json.features[j].properties.name;

           if (State == jsonState) {

             // Copy the data value into the JSON
             json.features[j].properties.value = Value;

             // Stop looking through the JSON
             break;
           }
         }
       }


       svg.selectAll("path")
         .data(json.features)
         .enter()
         .append('path')
         .attr("d", path)
         .style("stroke", "#fff")
         .style("stroke-width", "1")
         .style("fill", function (d) {
           return color(d.properties.value)
         });

       // add a legend
       var w = 140,
         h = 300;

       var key = d3.select(".canvas")
         .append("svg")
         .attr("width", w)
         .attr("height", h)
         .attr("class", "legend");

       var legend = key.append("defs")
         .append("svg:linearGradient")
         .attr("id", "gradient")
         .attr("x1", "100%")
         .attr("y1", "0%")
         .attr("x2", "100%")
         .attr("y2", "100%")
         .attr("spreadMethod", "pad");

       legend.append("stop")
         .attr("offset", "0%")
         .attr("stop-color", highColor)
         .attr("stop-opacity", 1);

       legend.append("stop")
         .attr("offset", "100%")
         .attr("stop-color", lowColor)
         .attr("stop-opacity", 1);

       key.append("rect")
         .attr("width", w - 100)
         .attr("height", h)
         .style("fill", "url(#gradient)")
         .attr("transform", "translate(0,10)");

       var y = d3.scaleLinear()
         .range([h, 0])
         .domain([minVal, maxVal]);

       var yAxis = d3.axisRight(y);

       key.append("g")
         .attr("class", "y axis")
         .attr("transform", "translate(41,10)")
         .call(yAxis)





     });
 } */