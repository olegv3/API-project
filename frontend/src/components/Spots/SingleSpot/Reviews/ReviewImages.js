import React from 'react'
import './ReviewImages.css'

function ReviewImages({images}) {
    return (
        <div className='reviewImageContainer fdc p1 g1'>
            <span className='fwb'>Review Images</span>
            <div className='imageContainer'>
                {images.map(image => (
                     <img className='reviewImage' key={image.id} src={image.url} alt={'pic'}/>
                ))}
            </div>
        </div>
    )
}

export default ReviewImages
