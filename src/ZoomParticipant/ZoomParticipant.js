
import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import EmptyZoomParticipant from './EmptyZoomParticipant'
import EnterMeeting from '../ZoomControls/EnterMeeting'
import noop from 'lodash/noop'

const ZoomParticipant = ({ children, name, width, height, onEnterMeeting = noop, onExitMeeting = noop }) => {
    const [enteredMeeting, setEnteredMeeting] = useState(false)
    const playAudioRef = useRef()

    const enterMeeting = () => {
        if (enteredMeeting) return;
        setEnteredMeeting(true)
        onEnterMeeting()
    }
    const exitMeeting = () => {
        if (!enteredMeeting) return;
        onExitMeeting()
        setEnteredMeeting(false)
    }
    // const display = enteredMeeting ? children : emptyZoomParticipant
    const visibility= enteredMeeting ? 'visible' : 'hidden'

    return <>
        <StyledDiv width={width} height={height} id="ZoomParticipant" onClick={enterMeeting}>
            <Layer1 id="Layer1" visibility={visibility}>
            <button onClick={exitMeeting}>Exit Meeting</button>
                {children}
            </Layer1>
            <Layer2 id="Layer2">
                <EmptyZoomParticipant enteredMeeting={enteredMeeting} name={name}></EmptyZoomParticipant>
            </Layer2>
        </StyledDiv>
        <EnterMeeting ref={playAudioRef} playAudio={enteredMeeting}/>
    </>
}

export default ZoomParticipant

const StyledDiv = styled.div`
    margin:1rem;
    background:white;
    border: 3px solid yellow;
    height:${(({height}) => height)}px;
    width:${(({width}) => width)}px;
    position: relative;
`
const Layer1 = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
z-index: 10;

visibility:${(({visibility}) => visibility)};
`
const Layer2 = styled.div`
width: 100%;
height: 100%;
position: absolute;
opacity:1;
top: 0;
left: 0;

`
