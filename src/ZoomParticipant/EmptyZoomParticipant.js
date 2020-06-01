
import React from 'react'
import styled from 'styled-components'

const EmptyZoomParticipant = ({name, enteredMeeting}) => {

    const visibility= enteredMeeting ? 'hidden' : 'visible'
    const opacity = enteredMeeting ? 0 : 1

    return <StyledDiv id="EmptyZoomParticipant" visibility={visibility} opacity={opacity}>
        {name} is Entering the Meeting
    </StyledDiv>
}

export default EmptyZoomParticipant

const StyledDiv = styled.div`
    width:100%;
    height:100%;
    background:white;
    visibility:${(({visibility}) => visibility)};
    opacity:${(({opacity}) => opacity)};

`