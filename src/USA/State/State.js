import React, { useState } from 'react';
import styled from 'styled-components';
import Tooltip from './Tooltip';

const State = ({ tooltipsEnabled, geojson, confirmed, colorFunction, name, onClick, svg, path }) => {
    const [tooltipLocation, setTooltipLocation] = useState({ x: 0, y: 0 })
    const [tooltipVisible, setTooltipVisible] = useState(false)

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
            <StyledPath d={path(geojson)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} colorFunction={colorFunction} confirmed={confirmed}>
            </StyledPath>
            <Tooltip name={'Enable tooltips'} tooltipsEnabled={tooltipsEnabled} location={tooltipLocation} isVisible={tooltipVisible}>
                <div>
                    <h3>{name}</h3>
                    <hr/>
                    <ul>
                        <li>Confirmed: {confirmed}</li>
                    </ul>
                    </div>
            </Tooltip>
        </>
    )
}

export default State

const StyledPath = styled.path`
    stroke: green;
    stroke-width: 1;
    fill:  ${({ colorFunction, confirmed }) => colorFunction(confirmed)};
`