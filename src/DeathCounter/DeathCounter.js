import React from 'react'
 
const DeathCounter = ({totalDeath, date}) => {
  return <div>{totalDeath}  Deaths as of {date.toISOString()}</div>;
};

export default DeathCounter