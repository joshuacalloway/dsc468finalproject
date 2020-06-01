import calc_sum from "./rateCompute";
import compute_rate from "./rateCompute";
import * as d3 from 'd3';
import React, {
    useEffect,
    useRef
} from 'react';
import styled from 'styled-components';
const drawScatter = function (states,data) {

    useEffect(() => {
       
        draw(states,data);
    })


    const canvasRef = useRef();

    function draw(states, data) {
        let rates = compute_rate(states, data)
        console.log('rates is ', rates)
        let margin = {
            top: 20,
            right: 200,
            bottom: 30,
            left: 50
        }
        let xmax = 0
        let ymax = 0
        let zmax = 0
        let zmin = 100000000;
        for (let i = 0; i < rates.length; i++) {
            let xv = rates[i]['hospital_rate'];
            let yv = rates[i]['death_rate'];
            let zv = rates[i]['confirmed_toll'];
            if (xv > xmax) {
                xmax = xv
            };
            if (yv > ymax) {
                ymax = yv
            };
            if (zv > xmax) {
                zmax = zv
            };
            if (zmin > zv) {
                zmin = zv
            };
        }
        console.log('xmax is ', xmax)
        d3.select(canvasRef.current).select('#scatterplot').remove();
        let canvas_width = 960;
        let canvas_height = 500;
        let svg = d3.select(canvasRef.current).append('svg').attr('id', 'scatterplot')
        svg.attr("width", canvas_width).attr("height", canvas_height);

        let width = canvas_width - margin.left - margin.right;
        let height = canvas_height - margin.top - margin.bottom;

        var formatPercent = d3.format(".0%");



        let g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //var parseTime = d3.timeParse("%d-%b-%y");

        let x = d3.scaleLinear()
            .domain([0, xmax + 0.05])
            .range([0, width]);

        let y = d3.scaleLinear()
            .domain([0, ymax + 0.05])
            .range([height, 0]);

        let z = d3.scaleSqrt()
            .domain([0, 20000])
            .range([2, 8]);
        let color = d3.scaleOrdinal(d3.schemeCategory10);
        let xAxis = d3.axisBottom(x).tickFormat(formatPercent)
        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("fill", "white")
            .attr("x", width)
            .attr("dy", "3em")
            .attr("text-anchor", "end")
            .text("Hospitalized Rate");

        var legend = svg.selectAll('#scatterplot.legend')
            .data(rates)
            .enter()
            .append('g')
            .attr('class', 'legend');

        legend.append('rect')
            .attr('x', canvas_width - 200)
            .attr('y', function (d, i) {
                return i * 20 + 40;
            })
            .attr('width', 10)
            .attr('height', 10)
            .style('fill', function (d, i) {
                return color(i);
            });

        legend.append('text')
            .attr('x', canvas_width - 188)
            .attr('y', function (d, i) {
                return (i * 20) + 49;
            })
            .text(function (d) {
                return d.state;
            })
            .style('fill', 'white')
            .style('font-size', '10px');
        let yAxis = d3.axisLeft(y).tickFormat(formatPercent)
        g.append("g")
            .call(yAxis)
            .append("text")
            .attr("fill", "white")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Death Rate");

        g.selectAll(".circles")
            .data(rates)
            .enter().append('g')
            .attr("class", "circles")

            .append("circle")

            .attr("cx", function (d) {
                console.log('hospital rate is ', x(d.hospital_rate));
                return x(d['hospital_rate']);
            })
            .attr("cy", function (d) {
                console.log('death rate is ', y(d.death_rate));
                return y(d.death_rate);
            })
            .attr("r", d => z(d.confirmed_toll))
            .style("fill", (d, i) => color(i))
            .on("mouseover", function (d) {
                d3.select(this)
                    .style("cursor", "pointer")
                    //.style("fill", 'white')
                    .append("text")
                    .attr("class", "text")
                    .text(d => d.confirmed_toll)
                    //.style('fill','white')
                    .attr("x", d => x(d.hospital_rate))
                    .attr("y", d => y(d.death_rate) - 5);

            })
            .on("mouseout", function (d, i) {
                console.log('this is:', this);
                d3.select(this)
                    .style("cursor", "none")
                    //.style("fill", (d,i)=>color(i))
                    .transition()
                    .duration(100)
                    .selectAll(".text").remove();
            });








        // .on('click', function (d) {
        //         d3.select(this).select('circle')
        //             .attr('fill', 'red');
        //         let notexist = true;
        //         let newdata = [];

        //         for (let i = 0; i < newScatter.data.length; i++) {
        //             let point = newScatter.data[i];
        //             if (point.id !== d.id) {
        //                 newdata.push(point);
        //             } else {
        //                 notexist = false;
        //                 d3.select(this).select('circle')
        //                     .attr('fill', 'green');

        //             }
        //         }
        //         if (notexist) {
        //             newdata.push(d);

        //         }

        //         newScatter.data = newdata;
        //         newScatter.dispatch.call("selected", {}, newScatter.data);

        //     }


        // )

    }
    return <StyledDiv ref={canvasRef}></StyledDiv>;

}
const StyledDiv = styled.div`    
    background-color: None;
    border:1px solid pink;
    width: 100%;
    height: 100%; 
    
`;

export default drawScatter;