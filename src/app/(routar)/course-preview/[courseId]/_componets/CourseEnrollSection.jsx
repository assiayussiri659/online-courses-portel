import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import GlobalApi from '/src/app/_utils/GlobalApi.js'

function CourseEnrollSection({ courseInfo, isUserAlreadyEnrolled }) {

  const { session } = useSession();

  const router=useRouter();

  useEffect(()=>{
    console.log("isUserAlreadyEnrolled", isUserAlreadyEnrolled)
  },[])

  const onEnrollCourse=()=>{
    console.log(resp);
        GlobalApi.enrollToCourse(courseInfo?.slug, session?.primaryEmailAddress?.emailAddress).then(resp=>{


          if(resp){
            router.push('/watch-course/'.id+resp.createUserEnrollCourse.id);
          }
          
        })
  }

  const membership = false;
  return (

    
    <div className='p-3 text-center rounded-sm bg-primary flex flex-col gap-3'>
      <h2 className='text-[22px] font-bold text-white'>Enroll to the Course</h2>



      {/* User has Membership and Alredy Login */}
      { session && (membership || courseInfo.free) ?

       <div className='flex flex-col gap-3 mt-3'>
        <h2 className='text-white font-light'>Enrool Now to Start Learning and Building the project</h2>
        <Button className='bg-white text-primary hover:bg-white hover:text-primary'
        onClick={()=>onEnrollCourse()}
        >Enroll Now</Button>
      </div>

        :!session ?
          <div className='flex flex-col gap-3 mt-3'>
            <h2 className='text-white font-light'>Enrool Now to Start Learning and Building the project</h2>
            <Link href={'/Signup'}>
              <Button className='bg-white text-primary hover:bg-white hover:text-primary'>Enroll Now</Button>
            </Link>
          </div>

          :
         <div className='flex flex-col gap-3 mt-3'>
            <h2 className='text-white font-light'>By Monthly membership anh Get Access to All Course</h2>
            <Button className='bg-white text-primary hover:bg-white hover:text-primary'>By membership Just $1.99</Button>
          </div>}
      {/* About Section User Does not Have Membership or not Signup/Login */}
    </div>

  )
}

export default CourseEnrollSection
