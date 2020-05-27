import React, { useState, useEffect } from 'react';
import './App.css';
import USA from './USA'
import { fetchCurrentCovid19, fetchCovid19ByDate } from './data'
import { set } from 'd3';
import Switch from 'react-input-switch';

function App() {

  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [date, setDate] = useState(new Date('2020-02-20'))
  const [isActive, setIsActive] = useState(true);
  const endDate = new Date('2020-05-23')
  const [tooltipsEnabled, setTooltipsEnabled] = useState(true);
  const enableTooltipToggleButton = <Switch on={true} value={tooltipsEnabled} onChange={setTooltipsEnabled} />;

  useEffect(() => {
    fetchCovid19ByDate(setError, setResult)
  }, []);

  const filterResultByDate = () => {
    const formatted = `${date.toISOString().split('T')[0].replace(/-/g,'')}`
    console.log("formatted is ", formatted)
    return result && result.filter( item => item.date == formatted)
  }

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
    setDate(new Date('2020-02-20'))
  }
  return (
    <div id="theApp" className="App">
      <p>This is USA as of {date.toDateString()}</p>
      <USA tooltipsEnabled={tooltipsEnabled} result={filterResultByDate(result)} onClick={() => alert('clicked USA')} />
      <button onClick={resetDate}>
        Reset Date
      </button>
      <div><div className={"label"}>Enable or Disable Tooltips </div> {enableTooltipToggleButton}</div>

    </div>
  );
}

export default App;
