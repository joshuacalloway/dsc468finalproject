import React, { useState, useEffect, useCallback, useRef } from 'react';
// import './App.css';
import USA from './USA'
import { fetchDailyCovidData } from './data'
import AnimatingLineGraph from './AnimatingLineGraph'
import styled from 'styled-components'
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import DeathCounter from './DeathCounter'

function App() {
  const startDate = new Date(Date.UTC(2020, 2,12,0,0))
  const endDate = new Date(Date.UTC(2020,5,24))
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [date, setDate] = useState(startDate)
  const [isActive, setIsActive] = useState(true);
  const [deathNumbers, setDeathNumbers] = useState([])
  const timerRef = useRef()

  useEffect(() => {
    fetchDailyCovidData(setError, setResult)
  }, []);



  const filterResultByDate = useCallback(() => {
    const formatted = `${date.toISOString().split('T')[0].replace(/-/g, '')}`
    return result && result.filter(item => item.date == formatted)
  })

  var filteredResults = filterResultByDate();

  const calculateTotalDeath = () => {
    filteredResults = filterResultByDate();
    if (filteredResults) {
      const {death} = filteredResults.reduce((item, {death}) => ({ death: death + item.death }), { death: 0})      
      return isNaN(death) ? 0 : death
    }
    return 0
  };

  const incrementDate = () => {
    var day = 60 * 60 * 24 * 1000;
    const nextDate = new Date(date.getTime() + day)
    if (nextDate.getTime() <= endDate.getTime()) {
      setDate(nextDate)
      console.log("incrementDate, nextDate is ", nextDate)
      // const death = calculateTotalDeath()
      // setTotalDeath(death)
      setDeathNumbers([...deathNumbers, {Date: nextDate, TotalDeath: calculateTotalDeath()}])
      console.log("deathNumbers is ", deathNumbers)
      const dataNumbers = deathNumbers.map(x => x.TotalDeath)
      console.log("dataNumbers is ", dataNumbers)
    }
  }

  const resetDate = () => {
    setIsActive(true)
    setDate(startDate)
  }
  const bloodRed = '#9b0000'
  return (
    <StyledVerticalDiv id="theApp" className="App">
        <StyledVerticalDiv>
          <DeathCounter totalDeath={calculateTotalDeath()} date={date} />
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
          <AnimatingLineGraph deathNumbers={deathNumbers} data={deathNumbers.map(x => x.TotalDeath)} stroke={bloodRed} strokeWidth={'1px'} width={'600'} height={'200'} />
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
  align-items: left;
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

