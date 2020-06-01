import React, { useState } from 'react';
import styled from 'styled-components';
import Tooltip from './Tooltip';
import stateCodes from '../state-codes.json'

const State = ({ onStateClicked, result, tooltipsEnabled, geojson, colorFunction, name, path }) => {
    const [tooltipLocation, setTooltipLocation] = useState({ x: 0, y: 0 })
    const [tooltipVisible, setTooltipVisible] = useState(false)

    const {positive = 0, death = 0, recovered = 0} = result

    const onMouseEnter = (e) => {
        setTooltipVisible(true)
        setTooltipLocation({ x: e.clientX, y: e.clientY })
    }

    const onMouseLeave = () => {
        setTooltipVisible(false);
        setTooltipLocation({ x: 0, y: 0 })
    }

    const findStateCodeByName = (name) => {
        const found = stateCodes.find(mapping => mapping.name == name)
        if (found) {
            return found.abbreviation
        }
        return ''
    }

    return (
        <>
            <StyledPath d={path(geojson)} onMouseEnter={onMouseEnter} death={death} onMouseLeave={onMouseLeave} colorFunction={colorFunction} positive={positive} onClick={() => onStateClicked(findStateCodeByName(name))}>
            </StyledPath>
            <Tooltip id={`Tooltip${name}`} name={name} tooltipsEnabled={tooltipsEnabled} location={tooltipLocation} isVisible={tooltipVisible}>
                <StyledDiv id="FindTooltip">
                    <h3>{name}</h3>
                    <hr/>
                    <ul>
                        <li>Confirmed: {positive}</li>
                        <li>death: {death}</li>
                        <li>recovered: {recovered}</li>
                    </ul>
                    </StyledDiv>
            </Tooltip>
        </>
    )
}

export default State
const StyledDiv = styled.div`
    z-index:100;
`

const StyledPath = styled.path`
    stroke: green;
    stroke-width: 1;
    opacity:0.9;
    fill:  ${({ colorFunction, confirmed, death }) => colorFunction(death)};
`