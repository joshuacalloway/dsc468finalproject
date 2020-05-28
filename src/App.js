import React, { useState, useEffect, useCallback } from 'react';
// import './App.css';
import USA from './USA'
import { fetchCovid19ByDate } from './data'
import Switch from 'react-input-switch';
import AnimatingLineGraph from './AnimatingLineGraph'
import styled from 'styled-components'
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import DeathCounter from './DeathCounter'

function App() {
  const startDate = new Date('2020-02-20')
  // const endDate = new Date('2020-02-25')

  const endDate = new Date('2020-05-23')

  const [result, setResult] = useState(null)
  const [deathNumbers, setDeathNumbers] = useState([])

  const [error, setError] = useState(null)
  const [date, setDate] = useState(startDate)
  const [isActive, setIsActive] = useState(true);

  const [tooltipsEnabled, setTooltipsEnabled] = useState(true);
  const enableTooltipToggleButton = <Switch on={true} value={tooltipsEnabled} onChange={setTooltipsEnabled} />;

  useEffect(() => {
    fetchCovid19ByDate(setError, setResult)
  }, []);

  const filterResultByDate = useCallback(() => {
    const formatted = `${date.toISOString().split('T')[0].replace(/-/g, '')}`
    return result && result.filter(item => item.date == formatted)
  })

  const summaryResultsByDate = (results) => {
    console.log("results is ", results)
    var summary = initializeSummaryResultsByDate(startDate, endDate);
    console.log("summary is ", summary)

    const toNum = (num) => isNaN(num) ? 0 : num;

    if (results) {
      results.map((item) => summary[item.date] = toNum(summary[item.date]) + toNum(item.death))
    }
    console.log("summary at exit is ", summary)

    // const deathTotals = results.reduce((acc, item) => 
    //   acc[item.date] ? {...acc, ({ acc[item.date]: acc[item.date].deaths + item.deaths }) } :
    //   {...acc, ({ acc[item.date]: item.deaths }) }
    // )
    var keys = new Array();
    var values = new Array();

    for (var key in summary) {
      keys.push(key);

      if (summary[key] > 0) values.push(summary[key]);
    }

    return { summary, keys, values };
  }

  const filteredResults = filterResultByDate(result);
  // const { summary, keys, values } = summaryResultsByDate(filteredResults)
  // console.log("summaryResults is: ", summary)

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        var day = 60 * 60 * 24 * 1000;
        const nextDate = new Date(date.getTime() + day);
        // console.log(nextDate)
        const formatted = `${date.toISOString().split('T')[0].replace(/-/g, '')}`
        const filteredResults = filterResultByDate()
        const deathTotal = filteredResults ? filteredResults.reduce((acc, item) => item.death + acc, 0) : undefined
        console.log("deathTotal is ", deathTotal)
        if (deathTotal != undefined && !isNaN(deathTotal)) {
          deathNumbers.push(deathTotal)
        }

        setDate(nextDate)
        if (date.getTime() > endDate.getTime()) {
          setIsActive(false)
        }
      }, 100);
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, date, endDate, deathNumbers, filterResultByDate]);

  const resetDate = () => {
    setIsActive(true)
    setDate(startDate)
  }
  const bloodRed = '#9b0000'
  return (
    <StyledVerticalDiv id="theApp" className="App">

        <StyledVerticalDiv>
          <DeathCounter date={date} />

          <button onClick={resetDate}>Reset Date</button>
          <USA tooltipsEnabled={tooltipsEnabled} result={filteredResults} onClick={() => alert('clicked USA')} />
        </StyledVerticalDiv>
        <StyledHorizontalDiv>
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="saurabhnemade"
          options={{ height: 400 }}
        />
      

          {/* <div><div className={"label"}>Enable or Disable Tooltips </div> {enableTooltipToggleButton}</div> */}


          <AnimatingLineGraph data={deathNumbers} stroke={bloodRed} strokeWidth={'1px'} width={'400'} height={'100'} />
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
function initializeSummaryResultsByDate(startDate, endDate) {
  var iter = startDate;
  var ret = {};
  while (iter <= endDate) {
    const formatted = `${iter.toISOString().split('T')[0].replace(/-/g, '')}`;
    var day = 60 * 60 * 24 * 1000;
    iter = new Date(iter.getTime() + day);

    ret[formatted] = 0
  }
  return ret;
}

