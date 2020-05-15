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
        
        console.log('data is ',data);
        let margin = {
            top: 20,
            right: 80,
            bottom: 30,
            left: 50
          },
          width = 900 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;
        
        //let parseDate=d3.timeFormat('%Y-%m-%d');
        let x = d3.scaleTime()
            .range([0, width]);

        let y = d3.scaleLinear()
            .range([height, 0]);

        let color = d3.scaleOrdinal(d3.schemeCategory10);

        let xAxis = d3.axisBottom(x);

        var yAxis = d3.axisLeft(y);

        let line = d3.line()
            .x(function(d) {return x(d.date);})
            .y(function(d) {return y(d.value);})
            .curve(d3.curveBasis);
        
        
        let svg = d3.select(canvasRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        let s=d3.keys(data[0]).filter(function(key) {
            
            return key !== "date";
            });
        
        color.domain(s);
          
        let status = color.domain().map(function(name) {
            
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
        console.log(status);
        
        x.domain(d3.extent(data, function(d) {
            return d.date;
          }));
        
        y.domain([
        d3.min(status, function(c) {
            return d3.min(c.values, function(v) {
            return v.count;
            });
        }),
        d3.max(status, function(c) {
            return d3.max(c.values, function(v) {
            return v.count;
            });
        })
        ]);

    let legend = svg.selectAll('g')
    .data(status)
    .enter()
    .append('g')
    .attr('class', 'legend');

    legend.append('rect')
      .attr('x', width - 50)
      .attr('y', function(d, i) {
        return i * 20;
      })
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', function(d) {
        return color(d.name);
      });

    legend.append('text')
      .attr('x', width - 38)
      .attr('y', function(d, i) {
        return (i * 20) + 9;
      })
      .text(function(d) {
        return d.name;
      })
      .style('fill','white');
    
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Count");
    

    



    let lines = svg.selectAll(".lines")
      .data(status)
      .enter().append("g")
      .attr("class", "line");

    lines.append("path")
      .attr("class", "line")
      .attr("d", function(d) {
        return line(d.values);
      })
      .style("stroke", function(d) {
        return color(d.name);
      });

    lines.append("text")
        .datum(function(d) {
        
        return {
            name: d.name,
            value: d.values[d.values.length - 1]
        };
        })
        .attr("transform", function(d) {
        return "translate(" + x(d.value.date) + "," + y(d.value.count) + ")";
        })
        .attr("x", 3)
        .attr("dy", ".35em")
        .text(function(d) {
        return d.name;
        });

        
      
        




        

        



        
    }
    return <div ref={canvasRef}></div>;
}
 
 
export default DrawFromLine
