import { Lock, LockKeyhole, Play } from 'lucide-react'
import React, { useState } from 'react'

function CourseContentSection({courseInfo}) {
    const [activeIndex,setActiveIndex]=useState(0);
  return (
    <div className='p-3 bg-whiter rounded-sm mt-3'>
      <h2>Contens</h2>
      {courseInfo?.chapter.map((item,index)=>(
        <div>
            <h2 className={`p-2 text-[14px] flex justify-between items-center mt-2
            hover:bg-gray-200 hover:text-gray-500
            border rounded-sm px-4 cursor-pointer ${activeIndex==index&&'bg-primary text-white'}`}>
            {index+1}.    {item.name}
            {activeIndex==index?<Play className='h-4 w-4'/>:
            <Lock className='h-4 w-4'/>}
            </h2>
        </div>
      ))}
    </div>
  )
}

export default CourseContentSection
