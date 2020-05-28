import React, { useState, useEffect } from 'react';
import './App.css';
import USA from './USA'
import { fetchCovid19ByDate } from './data'
import Switch from 'react-input-switch';
import AnimatingLineGraph from './AnimatingLineGraph'

function App() {
  const startDate = new Date('2020-02-20')
  const endDate = new Date('2020-05-23')

  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [date, setDate] = useState(startDate)
  const [isActive, setIsActive] = useState(true);

  const [tooltipsEnabled, setTooltipsEnabled] = useState(true);
  const enableTooltipToggleButton = <Switch on={true} value={tooltipsEnabled} onChange={setTooltipsEnabled} />;

  useEffect(() => {
    fetchCovid19ByDate(setError, setResult)
  }, []);

  const filterResultByDate = () => {
    const formatted = `${date.toISOString().split('T')[0].replace(/-/g,'')}`
    return result && result.filter( item => item.date == formatted)
  }

  const summaryResultsByDate = (results) => {
    console.log("results is ", results)
    var summary = initializeSummaryResultsByDate(startDate, endDate);
    console.log("summary is ", summary)

    const toNum = (num) => isNaN(num) ? 0 : num;
    // const deathTotals
    //  = results && results.reduce((acc, item) => { 
    //   const found = acc[Object.keys(acc).find(i => i.date.replace(/-/g, '') == item.date)]
    //   // console.log(`found is ${found} and item.date is: "${item.date}"`)
    //   if (found) 
    //   {
    //     found.count = found.count + toNum(item.death)
    //     summary[item.date] = found.count
    //     return summary;
    //   }
    //   return acc
    // }, summary)
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

    for(var key in summary) {
      keys.push(key);
      values.push(summary[key]);
    }

    return { summary, keys, values };
  }

  const { summary, keys, values } = summaryResultsByDate(result)
  console.log("summaryResults is: ", summary)
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        var day = 60 * 60 * 24 * 1000;
        const nextDate = new Date(date.getTime() + day);
        console.log(nextDate)
        setDate(nextDate)
        if (date.getTime() > endDate.getTime()) {
          setIsActive(false)
        }
      }, 100);
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, date, endDate]);
 
  const resetDate = () => {
    setIsActive(true)
    setDate(startDate)
  }
  const bloodRed = '#9b0000'
  return (
    <div id="theApp" className="App">
      <USA tooltipsEnabled={tooltipsEnabled} result={filterResultByDate(result)} onClick={() => alert('clicked USA')} />
      <button onClick={resetDate}>
        Reset Date
      </button>
      <div><div className={"label"}>Enable or Disable Tooltips </div> {enableTooltipToggleButton}</div>
      
      <p>This is USA as of {date.toDateString()}</p>

      <AnimatingLineGraph data={values} stroke={bloodRed} strokeWidth={'1px'} width={'300'} height={'30'}/>
    </div>
  );
}

export default App;
function initializeSummaryResultsByDate(startDate, endDate) {
  var iter = startDate;
  var ret = {};
  while (iter <= endDate) {
    const formatted = `${iter.toISOString().split('T')[0].replace(/-/g,'')}`;
    var day = 60 * 60 * 24 * 1000;
    iter = new Date(iter.getTime() + day);

    ret[formatted] = 0
  }
  return ret;
}

