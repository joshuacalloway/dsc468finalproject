import React, { useState, useEffect, useRef,useCallback } from 'react';
import SingleBar from './SingleBar';
import * as d3 from 'd3';
import styled from 'styled-components';
import axios from 'axios'
import { fetchDailyStateData } from '../data/fetchCurrentCovid19';

const FloatBarChart = () => {

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
    console.log("data",data)
    
    const max = 6000
    var x = d3.scaleLinear().domain([0, 87]).range([0, 600])
    var y = d3.scaleLinear().domain([0, max]).range([0, 600]);
    return (
            <StyleSvg>
            <g>
                {data.map((item, index) =>
                    <SingleBar x={490 - (index + padding * index)} y={500 - y(item.positiveIncrease)} width={padding} height={y(item.positiveIncrease)}
                        value={item.positiveIncrease} date={item.date}/>)}     
            </g> 
            </StyleSvg>
        
    )
}

const StyleSvg = styled.svg`
width:500px;
height:500px;
margin : 30px 30px 30px 30px;
border:1px solid black
`

export default FloatBarChart;

