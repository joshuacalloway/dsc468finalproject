import * as d3 from 'd3';
import calc_sum from '../scatterPlot/calc_sum';
import React, {
    useEffect,
    useRef
} from 'react';
import styled from 'styled-components';
const DrawMap = ({geojson, covidjson}) => {
    //call component 
    useEffect(() => {

        covidjson && draw(geojson, covidjson);
    }, [geojson, covidjson])

    const draw = function (geojson, covidjson) {
        //d3.select(canvasRef.current).selectAll('#hexagon_map').remove()
        //d3.select(canvasRef.current).selectAll('#maptooltip').remove()
        let svg = d3.select(svgRef.current)


        //const svg = d3.select("#hexagon_map")

        // Map and projection
        const projection = d3.geoMercator()
            .scale(350) // This is the zoom
            .translate([850, 440]); // You have to play with these values to center your map

        // Path generator
        const path = d3.geoPath()
            .projection(projection)

        console.log("before calc_sum, covidjson is ", covidjson)
        let summary = calc_sum(covidjson, 'positiveIncrease');
        console.log('map summary is ', summary)
        let states = Object.keys(summary);
        let values = Object.values(summary);

        // create a color pallette to set the range of high low cases
        let lowColor = 'white';
        let highColor = 'red';

        let minVal = d3.min(values);
        let maxVal = d3.max(values);
        let color = d3.scaleSqrt().domain([minVal, maxVal]).range([lowColor, highColor])
        //let logScale = d3.scaleLog().domain([minVal, maxVal]).range([])


        // bind geojson and covidjson together

        for (let i = 0; i < states.length; i++) {

            // Grab State Name
            let State = states[i];

            // Grab data value 
            let Value = values[i];

            // Find the corresponding state inside the GeoJSON
            for (let j = 0; j < geojson.features.length; j++) {
                let jsonState = geojson.features[j].properties.google_name.split("(")[0].trim();

                if (State === jsonState) {
                    // Copy the data value into the JSON
                    geojson.features[j].properties["value"] = Value;
                    // Stop looking through the JSON
                    break;
                }
            }
        }
        console.log("json", geojson)
        // tooltip
        const tooltip = d3.select(tooltipRef.current)
            .append("div")
            .style("opacity", 1)
            .attr("class", "tooltip")
            .style("background-color", "black")
            .style("border-radius", "5px")
            .style("padding", "10px")
            .style("color", "white")

        const showTooltip = function (d) {
            tooltip
                .transition()
                .duration(200)
            tooltip
                .style("opacity", 1)
                .text(d.properties.google_name.split("(")[0].trim() + ":" + d.properties.value)
                .attr("left", (d3.mouse(this)[0] + 3) + "px")
                .attr("top", (d3.mouse(this)[1] + 3) + "px")
        }
        const moveTooltip = function (d) {
            tooltip
                .attr("left", (d3.mouse(this)[0] + 3) + "px")
                .attr("top", (d3.mouse(this)[1] + 3) + "px")
        }
        const hideTooltip = function (d) {
            tooltip
                .transition()
                .duration(200)
                .style("opacity", 0)
        }

        //Draw the map
        let map = d3.select(mapRef.current)
        console.log("map is ", map)
        console.log("geojson is ", geojson)
        console.log("geojson.features is ", geojson.features)

        map.selectAll("path")
            .data(geojson.features)
            .enter()

        .append("path")
        .attr("d", path)
        .attr("stroke", "white")
        .style("fill", function (d) {
            return color(+d.properties.value)
        })


       // Add the labels
        svg.append("g")
            .selectAll("labels")
            .data(geojson.features)
            .enter()
            .append("text")
            .attr("x", function (d) {
                return path.centroid(d)[0]
            })
            .attr("y", function (d) {
                return path.centroid(d)[1]
            })
            .text(function (d) {
                return d.properties.iso3166_2
            })
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "central")
            .style("font-size", 11)
            .style("fill", "black")
            .on("mouseover", showTooltip)
            .on("mousemove", moveTooltip)
            .on("mouseleave", hideTooltip)
        // .on('click',clicktip)
        // add a legend
        let w = 120,
            h = 300;

        var key = svg.append("g")
            .attr("width", w)
            .attr("height", h)
            .attr("class", "legend")


        var legend = key.append("defs")
            .append("svg:linearGradient")
            .attr("id", "gradient_1")
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
            .style("fill", "url(#gradient_1)")
            .attr("transform", "translate(470,10)");

        var y = d3.scaleLinear()
            .range([h, 0])
            .domain([minVal, maxVal]);

        var yAxis = d3.axisRight(y);

        key.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(490,10)")
            .call(yAxis)

    }
    const svgRef = useRef()
    const mapRef = useRef()
    const tooltipRef = useRef()

    return (
        <StyledSvg ref={svgRef} id="hexagon_map">
            <g id="map" ref={mapRef}>
            </g>
            <g id="tooltip" ref={tooltipRef}>

            </g>
        </StyledSvg>
    );

}
const StyledSvg = styled.svg`
    width:500px;
    height:400px;
`

const StyledDiv = styled.div`    
    background-color: None;
    border:1px solid pink;
    width: 100%;
    height: 100%; 
    
`;

export default DrawMap;