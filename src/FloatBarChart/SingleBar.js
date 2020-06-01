import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as d3 from 'd3'
import styled from 'styled-components'
import Tooltip from './Tooltip';

const SingleBar = ({ x, y, width = 5, height, value, date }) => {
    // const formatted = `${date.toISOString().split('T')[0].replace(/-/g, '')}`
    const [tooltipLocation, setTooltipLocation] = useState({ x: 0, y: 0 })
    const [tooltipVisible, setTooltipVisible] = useState(false)
    const [color, setColor] = useState('blue')
    
    const onMouseEnter = (e) => {
        setTooltipVisible(true)
        setTooltipLocation({ x: e.clientX, y: e.clientY })
        setColor('red')
    }
    const onMouseLeave = () => {
        setTooltipVisible(false);
        setTooltipLocation({ x: 0, y: 0 })
        setColor('blue')
    }
    
    return (
        <>
            <rect fill={color} x={x} y={y} width={width} height={height} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
            <Tooltip name={`Deathfor${date}`} tooltipsEnabled={tooltipVisible} location={tooltipLocation} isVisible={tooltipVisible}>
                <div>
                    <li>date:{date}</li>
                    <li>Death:{value}</li>
                </div>
            </Tooltip>
        </>
        
    )
}


export default SingleBar


    