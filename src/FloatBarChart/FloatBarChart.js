import React, { useState, useEffect } from 'react';
import SingleBar from './SingleBar';
import * as d3 from 'd3';
import styled from 'styled-components';

const FloatBarChart = ({width,height, state, dailyjson}) => {
    const fix_height = height -20
    const [data, setData] = useState([])
    const padding = 5

    useEffect(() => {
        dailyjson && setData(dailyjson.filter(item => item.state == state).map((item) => item)) 
    }, [dailyjson, state])
    
    const max = 1000
    var x = d3.scaleLinear().domain([0, 87]).range([0, height])
    var y = d3.scaleLinear().domain([0, max]).range([0, height]);
    return (
            <StyleSvg width={width} height={height}>
            <g>
                {data.map((item, index) =>
                    <SingleBar x={width - (index + padding * index)} y={fix_height - y(item.deathIncrease)} width={padding} height={y(item.deathIncrease)}
                        value={item.deathIncrease} date={item.date}/>)}     
            </g> 
            </StyleSvg>
        
    )
}

const StyleSvg = styled.svg`


border:1px solid black
`

export default FloatBarChart;

// width:500px;
// height:500px;
// margin : 30px 30px 30px 30px;