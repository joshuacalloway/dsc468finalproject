import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
// json is GeoJSON --- Geography 
// geojson is is the united states data and covidjson is the data from api
const DrawFromLine = ({confirmedDateSummary,deathsDateSummary,recoveredDateSummary}) => {

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        drawLineFromJson(confirmedDateSummary,deathsDateSummary,recoveredDateSummary)
        
    });
    const canvasRef = useRef();

    
    const drawLineFromJson = (confirmed,deaths,recovered) => {
        let data=[];
        let dates=Object.keys(confirmed);
        let parseDate=d3.timeParse('%Y-%m-%d');
        for (let i=0;i<dates.length;i++){
            let date=dates[i];
            let c=confirmed[date];
            let d=deaths[date];
            let r=recovered[date];
            
            date=parseDate(date);
            let item={}
            
            //console.log(c);
            item['date']=date;
            item['confirm']=c;
            
            
            item['deaths']=d;
            
            
            
            item['recover']=r;
            
            data.push(item);
            //console.log('item is ',item);


        }
        let names=d3.keys(data[0]).filter(function(key) { 
            return key !== "date";
            });
        let status = names.map(function(name) {
        
            return {
                name: name,
                values: data.map(function(d) {
                return {
                    date: d.date,
                    count: d[name]
                };
                })
            };
            });
        console.log('status is ',status);
        data=status;
        var width = 1200;
        var height = 600;
        var margin = 50;
        var duration = 250;
        
        var lineOpacity = "0.55";
        var lineOpacityHover = "0.85";
        var otherLinesOpacityHover = "0.1";
        var lineStroke = "2.5px";
        var lineStrokeHover = "3.5px";
        
        var circleOpacity = '0.85';
        var circleOpacityOnLineHover = "0.65"
        var circleRadius = 3;
        var circleRadiusHover = 6;
        
        
       
        
        /* Scale */
        var xScale = d3.scaleTime()
        .domain(d3.extent(data[0].values, d => d.date))
        .range([0, width-margin]);
        
        var yScale = d3.scaleLinear()
        .domain([0, d3.max(data[0].values, d => d.count)])
        .range([height-margin, 0]);
        
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        
        /* Add SVG */
        var svg = d3.select(canvasRef.current).append("svg")
        .attr("width", (width+margin)+"px")
        .attr("height", (height+margin)+"px")
        //.style('background-color','white')
        .append('g')
        .attr("transform", `translate(${margin}, ${margin})`)
        
        
        
        /* Add line into SVG */
        var line = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.count));
        
        let lines = svg.append('g')
        .attr('class', 'lines');
        
        lines.selectAll('.line-group')
        .data(data).enter()
        .append('g')
        .attr('class', 'line-group')
        .attr('stroke-width',lineStroke)
        
        .on("mouseover", function(d, i) {
            svg.append("text")
                .attr("class", "title-text")
                .style("fill", color(i))        
                .text(d.name)
                .attr("text-anchor", "middle")
                .attr("x", (width-margin)/2)
                .attr("y", 5);
            })
        .on("mouseout", function(d) {
            svg.select(".title-text").remove();
            }
            )
        .append('path')

        .attr('class', 'line')  
        .attr('d', d => line(d.values))
        .style('stroke', (d, i) => color(i))
        .style('opacity', lineOpacity)
        .style('fill','none')
        .on("mouseover", function(d) {
            d3.selectAll('.line')
                            .style('opacity', otherLinesOpacityHover);
            d3.selectAll('.circle')
                            .style('opacity', circleOpacityOnLineHover);
            d3.select(this)
                .style('opacity', lineOpacityHover)
                .style("stroke-width", lineStrokeHover)
                .style("cursor", "pointer");
            })
        .on("mouseout", function(d) {
            d3.selectAll(".line")
                            .style('opacity', lineOpacity);
            d3.selectAll('.circle')
                            .style('opacity', circleOpacity);
            d3.select(this)
                .style("stroke-width", lineStroke)
                .style("cursor", "none");
            });
        
        
        /* Add circles in the line */
        lines.selectAll("circle-group")
        .data(data).enter()
        .append("g")
        .style("fill", (d, i) => color(i))
        .selectAll("circle")
        .data(d => d.values).enter()
        .append("g")
        .attr("class", "circle")  
        .on("mouseover", function(d) {
            d3.select(this)     
                .style("cursor", "pointer")
                .append("text")
                .attr("class", "text")
                .text(`${d.count}`)
                .attr("x", d => xScale(d.date) -45)
                .attr("y", d => yScale(d.count) - 10);
            })
        .on("mouseout", function(d) {
            d3.select(this)
                .style("cursor", "none")  
                .transition()
                .duration(duration)
                .selectAll(".text").remove();
            })
        .append("circle")
        .attr("cx", d => xScale(d.date))
        .attr("cy", d => yScale(d.count))
        .attr("r", circleRadius)
        .style('opacity', circleOpacity)
        
        .on("mouseover", function(d) {
                d3.select(this)
                .transition()
                .duration(duration)
                .attr("r", circleRadiusHover);
            })
            .on("mouseout", function(d) {
                d3.select(this) 
                .transition()
                .duration(duration)
                .attr("r", circleRadius);  
            });
        
        
        /* Add Axis into SVG */
        var xAxis = d3.axisBottom(xScale).ticks(6);
        var yAxis = d3.axisLeft(yScale).ticks(6);
        
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height-margin})`)
        
        .call(xAxis);
        
        svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        
        
        
        .append('text')
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
        
        .text("values");
        
       
        




        

        



        
    }
    return <StyledDiv ref={canvasRef}></StyledDiv>;
}
const StyledDiv = styled.div`    
    background-color: None;
    

    
`;
 
export default DrawFromLine
