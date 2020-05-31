import React from 'react'
import styled from 'styled-components'

const HorizontalGridLine = ({ value, yfunction, width,marginRight }) => {

    const y = yfunction(value)
    const widthAdjusted = width - marginRight
    return (
        <>
            <StyledGridLine id="GridLine" d={`M0.5,${y}H${widthAdjusted}`}/>

        </>
    )
}

export default HorizontalGridLine

const StyledGridLine = styled.path`
    stroke:#C9C9C9;
    stroke-dasharray: 3,7; 

`