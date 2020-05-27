import React, { useRef, useState } from 'react';
import SimpleTooltip from '../SimpleTooltip'
import styled from 'styled-components' // for setting style

// This is a buuble component, will be used in the bubble plot for each data point.
const Bubble = ({center,radius,tooltipsEnabled = true}) => { 
    const { x, y } = center //make it as center object
    
    // tooltips
    const [tooltipLocation, setTooltipLocation] = useState({ x: 0, y: 0 })
    const [tooltipVisible, setTooltipVisible] = useState(false)
    const tooltipRef = useRef(null)
    const onMouseEnter = (e) => {
        setTooltipVisible(true)
        setTooltipLocation({ x: e.pageX, y: e.pageY })
    }

    const onMouseLeave = () => {
        setTooltipVisible(false);
        setTooltipLocation({ x: 0, y: 0 })
    }

    return (
        
        <g id='bubble' transform="translate(30,30)"
        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <StyleCircle cx={x} cy={y} r={radius}>
                </StyleCircle>   
            
        <SimpleTooltip location={tooltipLocation} tooltipsEnabled={tooltipsEnabled} isVisible={tooltipVisible}>
            <div ref={tooltipRef}>
                <h1>This is header</h1>
                <hr />
                <div>
                    <p>Bar value is at {x} --> {y}</p>
                    <p>Tooltip is at {tooltipLocation.x}, {tooltipLocation.y}</p>
                </div>

            </div>
        </SimpleTooltip>
           
        </g>
    )
}

export default Bubble

const StyleCircle = styled.circle`
    fill:red;
`