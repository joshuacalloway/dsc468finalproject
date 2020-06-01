import React, { useEffect, useRef } from 'react'


const EnterMeeting = ({playAudio}) => {
    const audioRef = useRef()
    const sound = `${process.env.PUBLIC_URL}/enterzoom.mp3`
    useEffect(() => {
        if (playAudio) {
            audioRef.current.play()
        }
    }, [playAudio])

    return (
        <div>
            <audio ref={audioRef} className="audio-element">
                <source src={sound}></source>
            </audio>
        </div>
    )

}

export default EnterMeeting