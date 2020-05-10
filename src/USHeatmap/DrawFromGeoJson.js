import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3'
import styled from 'styled-components';
// json is GeoJSON --- Geography 
// geojson is is the united states data and covidjson is the data from api
const DrawFromGeoJson = ({geojson,covidjson, onClick}) => {

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        drawMapFromJson(geojson,covidjson, onClick)
        
    });
    const canvasRef = useRef();


    const drawMapFromJson = (geojson,covidjson, onClick) => {
        // get a summary of the number of cases of each state
        let summary={};
        for (let i = 0; i < covidjson.length; i++) {
            let data_point = covidjson[i];
            if(data_point.Status=="confirmed"){
            if (data_point.Province in summary) {
              summary[data_point.Province] = summary[data_point.Province]+data_point['Cases']+1;
            } else {
              summary[data_point.Province] = data_point['Cases']+1;
              //console.log(data_point.Province.length);
            }}
          }
          delete summary[""];
        
        let states = Object.keys(summary);
        let values = Object.values(summary);
        console.log(summary);

        // create a color pallette to set the range of high low cases
        let lowColor = '#f9f9f9';
        let highColor = '#bc2a66';

        let minVal = d3.min(values);
        let maxVal = d3.max(values);
        let color = d3.scaleLinear().domain([minVal, maxVal]).range([lowColor, highColor])

        
        // bind geojson and covidjson together
        for (let i = 0; i < states.length; i++) {

            // Grab State Name
            let State = states[i];
      
            // Grab data value 
            let Value = values[i];
      
            // Find the corresponding state inside the GeoJSON
            for (let j = 0; j < geojson.features.length; j++) {
              let jsonState = geojson.features[j].properties.name;
              
              if (State == jsonState) {
                
                // Copy the data value into the JSON
                geojson.features[j].properties.value = Value;
      
                // Stop looking through the JSON
                break;
              }
            }
          }


        //Width and height of map
        let width = 960;
        let height = 500;

        let svg = d3.select(canvasRef.current)
            .append('svg')
            .attr("onclick", "alert('clicked svg on DrawFromGeoJson, line 75')")
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
                return color(d.properties.value)
              });
        
        

    // add a legend
    let w = 140,
        h = 300;

    var key = d3.select(canvasRef.current)
        .append("svg")
        .attr("onclick", "alert('clicked svg on DrawFromGeoJson, line 108')")

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


        



        
    }
    return <div ref={canvasRef} onClick={() => alert('onClick on div tag')}></div>;
}
 
 
export default DrawFromGeoJson
