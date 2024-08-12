"use client"
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CourseVideoDescription from './_componets/CourseVideoDescription'
import GlobalApi from '@/app/_utils/GlobalApi'
import CourseEnrollSection from './_componets/CourseEnrollSection'
import CourseContentSection from './_componets/CourseContentSection'
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";


function CoursePreview({ params }) {
  // const { data: session, status } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/");
  //   }
  // }, [status, router]);

  const [courseInfo, setCourseInfo] = useState();
  useEffect(() => {
    params && getCourseInfoById();
  }, [params])


  // used to get Course Info By slug/id name 
  const getCourseInfoById = () => {
    GlobalApi.getCourseById(params?.courseId).then(resp => {
      setCourseInfo(resp?.data.courseList)
    })
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 p-5 gap-3'>
      {/* Video Titel Description */}

      <div className='col-span-2 bg-white p-3'>
        <CourseVideoDescription courseInfo={courseInfo} />

      </div>

      {/* Course content */}



      <div>
        <CourseEnrollSection courseInfo={courseInfo} />
      </div>
    </div>
  )
}

export default CoursePreview;

