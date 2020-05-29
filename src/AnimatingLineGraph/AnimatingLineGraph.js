import React, { useEffect, useRef, useState, useCallback } from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'

const bloodRed = '#9b0000'


const AnimatingLineGraph = ({
    height,
    index,
    data,
    width,
}) => {
    const max = d3.max(data)
    console.log("index is ", index, ", max is ", max)
    var x = d3.scaleLinear().domain([0, data.length]).range([-5, width]); // starting point is -5 so the first value doesn't show and slides off the edge as part of the transition
    var x2 = d3.scaleLinear().domain([0, data.length - index]).range([x(index), width]); // starting point is -5 so the first value doesn't show and slides off the edge as part of the transition

    // var y = d3.scaleLinear().domain([0, Math.max(...data)]).range([height, 0]);
    var y = d3.scaleLinear().domain([0, max]).range([height, 0]);

    var line = d3.line()
        .x((d, i) => {
            return x(i)
        })
        .y((d) => {
       //     console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
            return y(d)
        }
        )

    var line2 = d3.line()
        .x((d, i) => {
          //  console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
            return x2(i)
        })
        .y((d) => {
         //   console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
            return y(d)
        }
        )
    // .curve(d3.curveBasis)

    useEffect(() => {
        d3.select(firstPartPathRef.current).attr('d', line(data.slice(0, index)))
        d3.select(secondPartPathRef.current).attr('d', line2(data.slice(index)))

        d3.select(firstPartPathFillRef.current)
          .datum(data.slice(0,index))
          .attr("d", d3.area()
            .x(function(d,i) { return x(i) })
            .y0( height )
            .y1(function(d) { return y(d) })
            )

    }, [data, height, index, line, line2, x, y])

    const graphRef = useRef()
    const firstPartPathRef = useRef()
    const firstPartPathFillRef = useRef()
    const secondPartPathRef = useRef()
    const svgRef = useRef()

    return (
        <>
            <StyledSvg ref={svgRef} width={`${width}px`} height={`${height}px`}>
                <g>
                    <StaticPath1 id="path1" className="line" stroke={bloodRed} ref={firstPartPathRef} />
                    <StaticPath1Fill id="path1" className="line" stroke={bloodRed} ref={firstPartPathFillRef} />
                    <StaticPath2 id="path2" className="line" stroke={'#D3D3D3'} ref={secondPartPathRef} />
                </g>
            </StyledSvg>
        </>
    );
}

export default AnimatingLineGraph

const StaticPath1 = styled.path`
    stroke: ${({ stroke }) => stroke};
    fill: none;
    stroke-width: 4;
`

const StaticPath1Fill = styled.path`
    stroke: none;
    fill: red;
    stroke-width: 4;
    fill-opacity: 0.3;
`

const StaticPath2 = styled.path`
    stroke: ${({ stroke }) => stroke};
    stroke-dasharray: 5,5; 
    fill: none;
    stroke-width:2;
`
const StyledSvg = styled.svg`
    margin: 1rem;
    border:1px solid blue; 
`
