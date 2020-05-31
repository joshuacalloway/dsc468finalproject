import React from 'react'
 
import moment from 'moment'
import styled from 'styled-components'

const DeathCounter = ({totalDeath, date}) => {
  const dateFormatted = moment(date).format('MMM DD');
  const deathUrl = `${process.env.PUBLIC_URL}/death.png`

  return <StyledDiv>{totalDeath} <img src={deathUrl}/></StyledDiv>;
};

export default DeathCounter

const StyledDiv = styled.div`
  font-size:18px;
  color:red;
`
