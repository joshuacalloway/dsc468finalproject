import React, { useEffect, useRef, useState, useCallback } from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'


const AnimatingLineGraph = ({
    decimals = 4,
    desc = 'A line graph representation of a value\'s change over time.',
    fill = 'transparent',
    height = '100%',
    preserveAspectRatio = 'none',
    stroke = 'currentColor',
    strokeWidth = '1%',
    data,
    width = '100%',
}) => {
    var x = d3.scaleLinear().domain([0, data.length]).range([-5, width]); // starting point is -5 so the first value doesn't show and slides off the edge as part of the transition
    var y = d3.scaleLinear().domain([0, Math.max(...data)]).range([height, 0]);
    console.log("data is ", data)
    var line = d3.line()
        .x((d, i) => x(i))
        .y((d) => y(d))
        .curve(d3.curveBasis)

    useEffect(() =>{
        d3.select(pathRef.current).attr('d', line(data))
            .attr('stroke-width', (d) => d)
    }, [data, line])

    const graphRef = useRef()
    const pathRef = useRef()
    const svgRef = useRef()

    return (
        <>
            <StyledDiv ref={graphRef} className={"aGraph"} width={width} height={height}>
                <StyledSvg stroke={stroke} ref={svgRef}>
                    <path ref={pathRef} id="lineGraph" transform={`translate(${x(1)})`} />
                </StyledSvg>
            </StyledDiv>
        </>
    );
}

export default AnimatingLineGraph

const StyledDiv = styled.div`
border:1px solid pink; 
`
const StyledSvg = styled.svg`
    path {
        stroke: ${({stroke}) => stroke };
        stroke-width: 1;
        fill: none;
    }
    margin: 1rem;
    border:1px solid blue; 
`
