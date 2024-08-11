"use client"

import { Item } from '@radix-ui/react-select'
import Image from 'next/image'
import React from 'react'
function CourseItem({ course }) {
  return (
    <div className='border rounded-xl 
    hover:shadow-md
   hover:shadow-teal-300 
    cursor-pointer'>
      <Image src={course?.banner?.url}
        width={500}
        height={150}
        alt='banner'
        className='rounded-t-xl'
      />
      <div className='flex flex-col gap-1 p-1'>
        <h2 className='font-medium'>{course.name}</h2>
        <h2 className='text-[12px] text-gray-400'>{course.author}</h2>
        {course.chapter?.length == 0 ? <div className='flex gap-2'>
          <img src='/youtube.png'
            alt='youtube'
            width={20}
            height={20}
          />
          <h2 className='text-[14px] text-gray-400'>Watch Now youtube</h2>
        </div> :
          <div className='flex gap-2'>
            <img src='/chapter.png'
              alt='chapter'
              width={20}
              height={20}
            />
            <h2 className='text-[14px] text-gray-400'>Chapter</h2>
          </div>}
        <h2 className='text-[15px]'>{course?.free ? 'Free' : 'Paid'}</h2>
      </div>
    </div>
  )
}

export default CourseItem
