import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3'
import Bubble from './Bubble'
import styled from 'styled-components'


const BubblePlot = ({data, width,height}) => {
    // const margin = {top: 10, right: 20, bottom: 30, left: 50},
    // setting Axis
    const x = d3.scaleLinear()
                .domain([0, 4000]) // data's min to max
                .range([0, width-60]); // canvas min to max margin:30 for left and right each
    
    const y = d3.scaleLinear()
        .domain([35, 90])
        .range([ height-60,0]);
    
    // useEffect: 
    useEffect(() => {
        d3.select('#yaixs').call(d3.axisLeft(y))
        d3.select('#xaixs').call(d3.axisBottom(x))
    })
    
    // inside the svg: bubbles(data points), xaixs, yaixs
    return (
        <div>
            <StyleSvg  width={width} height={height}>
                <g transform = 'translate(30,30)'>
                    {data.map((item) =>
                        <Bubble center={{ x: item.death, y: item.recovery }} radius={item.comfirmed}></Bubble>)}
                </g>

                <g id='xaixs' transform={`translate(30,${height - 30})`} />
                <g id='yaixs' transform='translate(30,30)'/>
 
            </StyleSvg>
        </div>
    )
}

export default BubblePlot

// this is style for svg
const StyleSvg = styled.svg`
width: ${props => props.width}px;
height: ${props => props.height}px;
margin: 30px 30px 30px 30px;
`



