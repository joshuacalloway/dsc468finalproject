import React from 'react'
import { useCountUp } from 'react-countup';
 
const DeathCounter = ({date}) => {
  const { countUp } = useCountUp({ end: 100000 });
  return <div>{countUp}  Deaths as of {date.toDateString()}</div>;
};

export default DeathCounter