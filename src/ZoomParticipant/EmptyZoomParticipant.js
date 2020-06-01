
import React from 'react'
import styled from 'styled-components'

const EmptyZoomParticipant = ({name, enteredMeeting}) => {

    const visibility= enteredMeeting ? 'hidden' : 'visible'
    const opacity = enteredMeeting ? 0 : 1

    return <StyledDiv id="EmptyZoomParticipant" visibility={visibility} opacity={opacity}>
        <p>{name} is Entering the Meeting</p>
    </StyledDiv>
}

export default EmptyZoomParticipant

const StyledDiv = styled.div`
    width:100%;
    height:100%;
    background:white;
    visibility:${(({visibility}) => visibility)};
    opacity:${(({opacity}) => opacity)};
    font-size:18px;
    line-height:25px;
    display: table-cell;
    vertical-align: middle;
    display: flex;
    align-items:center;
    justify-content:center;
    text-decoration-style: wavy;
    text-decoration-line: overline underline;

`