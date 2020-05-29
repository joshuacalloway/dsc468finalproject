import React, { useRef, useState } from 'react';
import SimpleTooltip from '../SimpleTooltip'

const Bar = ({ chartHeight = 400, barWidth = 20, value, label, position, tooltipsEnabled = true }) => {
    const barHeight = chartHeight - value;
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
        <>
            <rect className="bar" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
                transform={`translate(${position * barWidth}, 0)`}
                y={value}
                height={barHeight}
                width={barWidth}></rect>
            <SimpleTooltip location={tooltipLocation} tooltipsEnabled={tooltipsEnabled} isVisible={tooltipVisible}>
                <div ref={tooltipRef}>
                    <h1>This is header</h1>
                    <hr />
                    <div>
                        <p>Bar value is at {label} --> {value}</p>
                        <p>Tooltip is at {tooltipLocation.x}, {tooltipLocation.y}</p>
                    </div>

                </div>
            </SimpleTooltip>
        </>
    );
}

export default Bar