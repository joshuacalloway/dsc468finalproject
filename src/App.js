import React, { useState, useEffect, useCallback, useRef } from 'react';
// import './App.css';
import USA from './USA'
import { fetchDailyCovidData } from './data'
import AnimatingLineGraph from './AnimatingLineGraph'
import styled from 'styled-components'
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import DeathCounter from './DeathCounter'

function App() {
  const startDate = new Date(Date.UTC(2020, 2,11,0,0))
  const endDate = new Date(Date.UTC(2020,4,24))
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [date, setDate] = useState(startDate)
  const [dateIndex, setDateIndex] = useState(0)
  const [isActive, setIsActive] = useState(true);
  const [deathNumbers, setDeathNumbers] = useState([])
  const timerRef = useRef()
  

  const filterResultByDate = useCallback((result, date) => {
    const formatted = `${date.toISOString().split('T')[0].replace(/-/g, '')}`
    return result && result.filter(item => item.date == formatted)
  })

  var filteredResults = filterResultByDate(result, date);

  const calculateTotalDeath = (filteredResults) => {
    if (filteredResults) {
      const {death} = filteredResults.reduce((item, {death}) => ({ death: death + item.death }), { death: 0})      
      return isNaN(death) ? 0 : death
    }
    return 0
  };

  const incrementDate = () => {
    var day = 60 * 60 * 24 * 1000;
    if (date.getTime() <= endDate.getTime()) {
      const nextDate = new Date(date.getTime() + day)
      setDate(nextDate)
      setDateIndex(dateIndex+1)
    }
  }
  const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const resetDate = useCallback(() => {
    setIsActive(true)
    setDate(startDate)
    setDateIndex(0)
  })

  useEffect(() => {
    fetchDailyCovidData(setError, setResult)
  },[])

  const calculateDeathArr = (result, startDate, endDate) => {
    var day = 60 * 60 * 24 * 1000;
    //const iter = new Date(startDate.getTime())

    const filterResultByDate2 = (result, date) => {
      const formatted = `${date.toISOString().split('T')[0].replace(/-/g, '')}`
      return result && result.filter(item => item.date == formatted)
    }
    const formatDate = (date) => {
      return date.toISOString().split('T')[0].replace(/-/g, '');
    }

    var iter = new Date(startDate.getTime())

    var deathArr = []
    while (iter.getTime() <= endDate.getTime()) {
      const filtered = filterResultByDate2(result, iter);
      const total = calculateTotalDeath(filtered)
      console.log("total is ", total, ", filtered for ", formatDate(iter), " is ", filtered)

      deathArr = [...deathArr, {Date: formatDate(iter), TotalDeath: total}]
      console.log("iter before increment is ", formatDate(iter))

      iter = addDays(iter, 1)
      console.log("iter after increment is ", formatDate(iter))
    }
    console.log("useEffect, deathArr is ", deathArr)
    return deathArr;
  }

  return (
    <StyledVerticalDiv id="theApp" className="App">
        <StyledVerticalDiv>
          <DeathCounter totalDeath={calculateTotalDeath(filterResultByDate(result, date))} date={date} />
          <button onClick={incrementDate}>Next Date</button>
          <button onClick={resetDate}>Reset Date</button>

          <USA tooltipsEnabled={true} result={filteredResults} onClick={() => alert('clicked USA')} />
        </StyledVerticalDiv>
        <StyledHorizontalDiv>
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="saurabhnemade"
          options={{ height: 400 }}
        />
          {/* <div><div className={"label"}>Enable or Disable Tooltips </div> {enableTooltipToggleButton}</div> */}
          <AnimatingLineGraph index={dateIndex} data={calculateDeathArr(result, startDate, endDate).map(x => x.TotalDeath)} width={'800'} height={'400'} />
        </StyledHorizontalDiv>
      </StyledVerticalDiv>
  );
}
const StyledVerticalDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledHorizontalDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: flex-start;
`;

export default App;
// function initializeSummaryResultsByDate(startDate, endDate) {
//   var iter = startDate;
//   var ret = {};
//   while (iter <= endDate) {
//     const formatted = `${iter.toISOString().split('T')[0].replace(/-/g, '')}`;
//     var day = 60 * 60 * 24 * 1000;
//     iter = new Date(iter.getTime() + day);

//     ret[formatted] = 0
//   }
//   return ret;
// }

