import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'
const bloodRed = '#9b0000'

const MovingDeathLabel = ({ currentDeathNumbersYScaled, currentDeathNumbers }) => {
    const textRef = useRef()
    const rectRef = useRef()
    const borderRectRef = useRef()

    const deathNumbersFormatted = currentDeathNumbers < 1000 ? currentDeathNumbers : `${Math.round(currentDeathNumbers / 1000)}K`
    useEffect(() => {
        const text = d3.select(textRef.current).node().getBBox()
        d3.select(rectRef.current)
            .attr("x", text.x)
            .attr("y", text.y)
            .attr("width", '21.359375')
            .attr("height", text.height)

        d3.select(borderRectRef.current)
            .attr("x", text.x)
            .attr("y", text.y)
            .attr("width", '21.359375')
            .attr("height", text.height)
    })
    return (
        <g id="movingDeathLabel" className="tick" transform={`translate(0,${currentDeathNumbersYScaled})`}>
            <StyledBorderRect ref={borderRectRef} />
            <StyledRect ref={rectRef} />
            <StyledText ref={textRef} x="9" dy="0.32em">{deathNumbersFormatted}</StyledText>
        </g>
    )
}

export default MovingDeathLabel

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
    stroke:white;
`