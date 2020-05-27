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
    title = 'Sparkline',
    values,
    viewBoxHeight = 100,
    viewBoxWidth = 100,
    width = '100%',
}) => {
    const [data, setData] = useState([3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 9])

    var x = d3.scaleLinear().domain([0, 48]).range([-5, width]); // starting point is -5 so the first value doesn't show and slides off the edge as part of the transition
    var y = d3.scaleLinear().domain([0, 10]).range([0, height]);

    const transitionDelay = 1000
    var line = d3.line()
        // assign the X function to plot our line as we wish
        .x((d, i) => x(i))
        .y((d) => y(d))
        .curve(d3.curveBasis)

    const redrawWithAnimation = useCallback(() => {
        d3.select("#lineGraph")
            .data([data])
            .attr("transform", "translate(" + x(1) + ")")
            .attr("d", line) // apply the new data values ... but the new value is hidden at this point off the right of the canvas
            .transition() // start a transition to bring the new value into view
            .ease(d3.easeLinear)
            .duration(transitionDelay) // for this demo we want a continual slide so set this to the same as the setInterval amount below
            .attr("transform", "translate(" + x(0) + ")"); // animate a slide to the left back to x(0) pixels to reveal the new value

    }, [data, line, x]);

    const timer = setInterval(() => {
        var v = data.shift(); // remove the first element of the array
        data.push(v)
        setData(data)
        redrawWithAnimation()
    }, 1000);


    // .interpolate(interpolation)
    useEffect(() => {
        d3.select(pathRef.current).attr('d', line(data))
    }, [data, line])

    const graphRef = useRef()
    const pathRef = useRef()
    const svgRef = useRef()

    return (
        <>
            <div ref={graphRef} className={"aGraph"} style={{ width: '300px', height: '30px' }}>
                <StyledSvg ref={svgRef} width={'500px'} height={'200px'}>
                    <path ref={pathRef} id="lineGraph" transform={`translate(${x(1)})`} />
                </StyledSvg>

            </div>
        </>
    );
}

export default AnimatingLineGraph

const StyledSvg = styled.svg`
    path {
        stroke: steelblue;
        stroke-width: 1;
        fill: none;
    }
    margin-left: 20rem;
    margin-top: 5rem;
`
