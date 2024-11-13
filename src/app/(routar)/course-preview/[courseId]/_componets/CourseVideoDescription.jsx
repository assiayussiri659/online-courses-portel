"use client"
import React from 'react'
import VideoPlayer from './VideoPlayer'
import Markdown from 'react-markdown'

function CourseVideoDescription({ courseInfo }) {
  console.log("CourseVideoDescription :", courseInfo?.chapter)
  return (
    <div>
      <h2 className='text-[20px] font-semibold'>{courseInfo?.name}</h2>
      <h2 className='text-gray-500 text-[14px] md-3'>{courseInfo?.author}</h2>
      {/* video player */}
        {courseInfo?.chapter[0] && <VideoPlayer videoUrl={courseInfo?.chapter[0]?.video?.url} />}

      {/* Description */}

      <h2 className='mt-5 text-[17px] font-semibold'>About This course</h2>

      <Markdown className='text-[13px] font-light mt-2 leading-6'>{courseInfo?.description}</Markdown>

    </div>
  )
}
export default CourseVideoDescription
