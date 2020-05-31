import React, { useRef } from 'react'

import styled from 'styled-components'
import * as d3 from 'd3'
const bloodRed = '#9b0000'

const MovingDate = ({x,y, dateFormatted}) => {
    const textRef = useRef()
    const rectRef = useRef()
    const borderRectRef = useRef()

    const xMoved = x + 5

    return (
        <g id="movingDate" className="tick" transform={`translate(${xMoved},${y})`}>
            <StyledBorderRect ref={borderRectRef} />
            <StyledRect ref={rectRef} />
            <StyledText transform="rotate(45)" ref={textRef} x="9" dy="0.32em">{dateFormatted}</StyledText>
        </g>
    )
}
export default MovingDate

const StyledBorderRect = styled.rect`
    fill:none;
    stroke:black;
`
const StyledRect = styled.rect`
    fill:${bloodRed};
    opacity: 0.5;
`
const StyledText = styled.text`
    z-index:999999999;
    text-anchor:start;
    font-size:14px;
    stroke:black;
`