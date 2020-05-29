import React, { useRef, useState } from 'react';
import SimpleTooltip from '../SimpleTooltip'
import styled from 'styled-components' // for setting style

// This is a buuble component, will be used in the bubble plot for each data point.
const Bubble = ({ center, radius}) => {
    const { x, y } = center //make it as center object

    // tooltips
    const [tooltipLocation, setTooltipLocation] = useState({ x: 0, y: 0 })
    const [tooltipVisible, setTooltipVisible] = useState(false)
  
    const onMouseEnter = (e) => {
        setTooltipVisible(true)
        setTooltipLocation({ x: e.clientX, y: e.clientY })
        console.log("f",e)
        console.log('eeee', e.clientX)
        console.log("cir",x)
    }

    const onMouseLeave = () => {
        setTooltipVisible(false);
        setTooltipLocation({ x: 0, y: 0 })
        
    }

    return (
        <>
            
            <StyleCircle cx={x} cy={y} r={radius+10} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
            </StyleCircle>
            
            <SimpleTooltip location={tooltipLocation} tooltipsEnabled={true} isVisible={tooltipVisible}>
                <div>
                    <h1>This is header</h1>
                    <hr />
                    <div>
                        <p>Bar value is at {x} --> {y}</p>
                        <p>Tooltip is at {tooltipLocation.x}, {tooltipLocation.y}</p>
                    </div>

                </div>
            </SimpleTooltip>
        </>

    )
}

export default Bubble

const StyleCircle = styled.circle`
    fill:red;
`