import React from 'react'

function VideoPlayer({ videoUrl }) {
    console.log("videoUrl: ", videoUrl)
    return (
        <video className="w-full h-auto max-w-full rounded-sm"
         controls>
            <source src={videoUrl} type="video/mp4"/>
        </video>
    )
}

export default VideoPlayer
