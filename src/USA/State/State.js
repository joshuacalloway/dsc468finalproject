import React, { useState } from 'react';
import styled from 'styled-components';
import Tooltip from './Tooltip';
// import FloatBarChart from '../src/floatBarChart/FloatBarChart';


const State = ({ result, tooltipsEnabled, geojson, colorFunction, name, onClick, svg, path }) => {
    const [tooltipLocation, setTooltipLocation] = useState({ x: 0, y: 0 })
    const [tooltipVisible, setTooltipVisible] = useState(false)
    const [barVisible, setBarVisiable] = useState("hidden")

    const {positive = 0, death = 0, recovered = 0} = result

    const onMouseEnter = (e) => {
        setTooltipVisible(true)
        setTooltipLocation({ x: e.pageX, y: e.pageY })
    }

    const onMouseLeave = () => {
        setTooltipVisible(false);
        setTooltipLocation({ x: 0, y: 0 })
    }

    const onClickShowBar = () => {
        console.log("HEREREE")
        setBarVisiable("visible")
        console.log(barVisible)
    }

    return (
        <>
            <StyledPath d={path(geojson)} onMouseEnter={onMouseEnter} death={death} onMouseLeave={onMouseLeave} colorFunction={colorFunction} positive={positive} onClick={onClickShowBar}>
            </StyledPath>
            <Tooltip name={'Enable tooltips'} tooltipsEnabled={tooltipsEnabled} location={tooltipLocation} isVisible={tooltipVisible}>
                <div>
                    <h3>{name}</h3>
                    <hr/>
                    <ul>
                        <li>Confirmed: {positive}</li>
                        <li>death: {death}</li>
                        <li>recovered: {recovered}</li>
                        <li>cF: {colorFunction(death)}</li>
                    </ul>
                    </div>
            </Tooltip>
            <circle visibility={barVisible} cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow"/>
                
        </>
    )
}

export default State

const StyledPath = styled.path`
    stroke: green;
    stroke-width: 1;
    fill:  ${({ colorFunction, confirmed, death }) => colorFunction(death)};
`