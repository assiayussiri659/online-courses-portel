"use client"
import React from 'react'
import WellcomeBanner from './_components/WellcomeBanner'
import CourseList from './_components/CourseList'
import SideBanners from './_components/SideBanners'
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";


function Courses() {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 p-5 gap-5'>
      {/* left container */}
      <div className='col-span-2'>
        {/* Banner */}
        <WellcomeBanner />


        {/* CourseList */}

        <CourseList />
      </div>
      {/* Right container */}
      <div className='p-5 bg-white rounded-xl'>
        <SideBanners />
      </div>
    </div>
  )
}

export default Courses
