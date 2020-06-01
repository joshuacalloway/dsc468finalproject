import React, { useState, useEffect, useRef,useCallback } from 'react';
import SingleBar from './SingleBar';
import * as d3 from 'd3';
import styled from 'styled-components';
import axios from 'axios'
import { fetchDailyStateData } from '../data/fetchCurrentCovid19';

const FloatBarChart = ({width,height}) => {
    const fix_height = height -20
    const startDate = new Date(Date.UTC(2020, 0, 22)) // first case is 2020/01/22 in WA
    const endDate = new Date(Date.UTC(2020,5,29)) // till now
    const [date, setDate] = useState([])
    const [state, setState] = useState('TX')
    const [data, setData] = useState([])
    const padding = 5

    useEffect(() => {
        axios.get('https://covidtracking.com/api/v1/states/daily.json').then(
            data => {
                setData(data.data.filter(item => item.state == state).map((item) => item)) 
            }
        )
    }, [])
    console.log("dataaa",data)
    
    const max = height
    var x = d3.scaleLinear().domain([0, 87]).range([0, 600])
    var y = d3.scaleLinear().domain([0, max]).range([0, 600]);
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