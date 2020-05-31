import React from 'react'

import styled from 'styled-components'
import MovingDeathLabel from './MovingDeathLabel'
import RightTickForRightMargin from './RightTickForRIghtMargin'

const RightMargin = ({ yfunction, currentDeathNumbers, currentDeathNumbersYScaled, width, marginRight }) => {
    const marginX = width - marginRight

    return (
        <>
            <g transform={`translate(${marginX},0)`}>
                <StyledVerticalPath id="verticalLineAxis" d="M0.5,400.5V20" className="domain"></StyledVerticalPath>
                <MovingDeathLabel width={width} marginRight={marginRight} currentDeathNumbersYScaled={currentDeathNumbersYScaled} currentDeathNumbers={currentDeathNumbers} />
                <RightTickForRightMargin value={10000} yfunction={yfunction} />
                <RightTickForRightMargin value={30000} yfunction={yfunction} />
                <RightTickForRightMargin value={50000} yfunction={yfunction} />
                <RightTickForRightMargin value={70000} yfunction={yfunction} />
                <RightTickForRightMargin value={90000} yfunction={yfunction} />
            </g>
        </>
    )
}

export default RightMargin
const StyledVerticalPath = styled.path`
    stroke:grey;
    stroke-width:2;
`