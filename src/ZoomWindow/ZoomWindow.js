import React from 'react'
import ZoomControls from '../ZoomControls'
import styled from 'styled-components'

const ZoomWindow = ({ children }) => {

    return (
        <ZoomWindowDiv id="ZoomWindow">
            <StyledDiv>
                {children}
            </StyledDiv>
            <ZoomControls />
        </ZoomWindowDiv>
    )
}

export default ZoomWindow

const StyledDiv = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
align-items: stretch;
background:black;
width:1500px;
`
const ZoomWindowDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: stretch;
width:1500px;
`