import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FloatBarChart from './floatBarChart/FloatBarChart';
import * as serviceWorker from './serviceWorker';
import Slider_com from './Slider/Slider';


ReactDOM.render(
  <React.StrictMode>
    <App />
    <FloatBarChart />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
