import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'
import RightMargin from './RightMargin'
import MovingDate from './MovingDate'
import moment from 'moment'
import GridLines from './GridLines'

const bloodRed = '#9b0000'

const CovidDeathLineGraph = ({
    height,
    index,
    data,
    width,
    marginLeft,
    marginRight,
    marginTop,
    date,
}) => {
    const max = d3.max(data)
    const currentDeathNumbers = data && data[index] ? data[index] : 0
    var x = d3.scaleLinear().domain([0, data.length]).range([-marginLeft, width-marginRight]); // starting point is -5 so the first value doesn't show and slides off the edge as part of the transition
    var x2 = d3.scaleLinear().domain([0, data.length - index]).range([x(index), width-marginRight]); // starting point is -5 so the first value doesn't show and slides off the edge as part of the transition
    var y = d3.scaleLinear().domain([0, max]).range([height, marginTop]);

    const currentDeathNumbersYScaled = y(currentDeathNumbers)
    const currentXScaled = x(index)
    const dateFormatted = moment(date).format('MMM DD');
    
    // currentXScaled,dateFormatted
    var line = d3.line()
        .x((d, i) => x(i))
        .y((d) => y(d))

    var line2 = d3.line()
        .x((d, i) => x2(i))
        .y((d) =>  y(d))
    // .curve(d3.curveBasis)

    useEffect(() => {
        d3.select(firstPartPathRef.current).attr('d', line(data.slice(0, index)))
        d3.select(secondPartPathRef.current).attr('d', line2(data.slice(index)))

        d3.select(firstPartPathFillRef.current)
          .datum(data.slice(0,index))
          .attr("d", d3.area()
            .x((d,i) => x(i))
            .y0( height )
            .y1((d) => y(d)))

    }, [data, height, index, line, line2, x, y])

    const graphRef = useRef()
    const firstPartPathRef = useRef()
    const firstPartPathFillRef = useRef()
    const secondPartPathRef = useRef()
    const svgRef = useRef()

    return (
        <>
            <StyledSvg ref={svgRef} width={`${width}px`} height={`${height}px`}>
                <GridLines yfunction={y} width={width} marginRight={marginRight} marginLeft={marginLeft} marginTop={marginTop} height={height}/>
                <StyledG id="StyledG" width={width}>
                    <StaticPath1 id="path1" className="line" stroke={bloodRed} ref={firstPartPathRef} />
                    <StaticPath1Fill id="path1" className="line" stroke={bloodRed} ref={firstPartPathFillRef} />
                    <StaticPath2 id="path2" className="line" stroke={'#D3D3D3'} ref={secondPartPathRef} />
                </StyledG>
                <RightMargin yfunction={y} width={width} marginRight={marginRight} currentDeathNumbers={currentDeathNumbers} currentDeathNumbersYScaled={currentDeathNumbersYScaled}/>
                <MovingDate width={width} marginRight={marginRight} x={currentXScaled} y={currentDeathNumbersYScaled} dateFormatted={dateFormatted} />
            </StyledSvg>
        </>
    );
}

export default CovidDeathLineGraph

const StyledG = styled.g`
    border: 1px solid green;
`
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
