import React from 'react'
import styled from 'styled-components'

const ZoomControls = () => {

    const image = `${process.env.PUBLIC_URL}/zoomcontrols.png`


    return (
        <StyledDiv><img width={'100%'} src={image}/></StyledDiv>
    )
}

export default ZoomControls;

const StyledDiv = styled.div`
    width:100%;
`