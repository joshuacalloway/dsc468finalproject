import React, {useRef, useEffect} from 'react'

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
// import ReactBnbGallery from 'react-bnb-gallery'
// import covid19march from '../../public/covid19march.jpg'

const images = [
    {
      original: `${process.env.PUBLIC_URL}/covid19march.jpg`,
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ];

const CovidImageGallery = () => {
    const galleryRef = useRef()

    useEffect(() => {
        galleryRef.current.play()
    })
    return <ImageGallery ref={galleryRef} showThumbnails={false} items={images} />;


}

export default CovidImageGallery