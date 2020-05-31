import React, { useRef, useEffect } from 'react'

import styled from 'styled-components'
import CrossfadeImage from 'react-crossfade-image'

const images = [
    'white.png',
    'covid19march.jpg',
    'covid19april.jpg',
    'covid19may30.jpg'
]
const CovidImageGallery = ({ index, width, height }) => {
    const galleryRef = useRef()
    const moduleDiv = images.length
    const getImage = (i) => `${process.env.PUBLIC_URL}/${images[i % moduleDiv]}`

    return (
        <StyledDiv>
            <CrossfadeImage ref={galleryRef} delay={1000} duration={6000} width={width} height={height} src={getImage(index)} />
        </StyledDiv>
    )
}

export default CovidImageGallery

const StyledDiv = styled.div`
    opacity:1;
    object-fit: cover;
`