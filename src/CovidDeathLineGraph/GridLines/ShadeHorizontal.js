import React from 'react'

import styled from 'styled-components'

const ShadeHorizontal = ({from, to, yfunction, marginRight, marginLeft, width}) => {

    const ypos=yfunction(to)
    const height =yfunction(from) - ypos
    const widthAdjusted = width - marginRight
    return (
        <>
            <ShadedRect id="ShadedRect" x={0} y={ypos} width={widthAdjusted} height={height}>

            </ShadedRect>
        </>
    )
}

export default ShadeHorizontal

const ShadedRect = styled.rect`
fill:#d3d3d3;
opacity: 0.5;
`