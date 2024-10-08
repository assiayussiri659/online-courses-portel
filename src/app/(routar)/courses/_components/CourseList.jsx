import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import CourseItem from './CourseItem'
import Link from 'next/link'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function CourseList() {

  const { data: session, status } = useSession();
  const router = useRouter();
  const [courseList, setCorurseList] = useState([])
  useEffect(() => {
    getAllCourses();
  }, [])
  //Fech CourseList Data
  const getAllCourses = () => {
    GlobalApi.getAllCourseList().then(resp => {
      setCorurseList(resp?.data.courseLists)
    })
  }
  return (
    <div className='p-5 bg-white rounded-lg mt-5 w-full'>
      {/* Tital and Filter */}
      <div className='flex items-center justify-between'>
        <h2 className='text-[20px] font-bold text-primary'>All Courses</h2>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Fliter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">All</SelectItem>
            <SelectItem value="dark">Paid</SelectItem>
            <SelectItem value="system">Free</SelectItem>
          </SelectContent>
        </Select>

      </div>
      {/* Display course List */}
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
        {courseList?.length > 0 ? courseList.map((item, index) => (
          <Link href={'course-preview/' + item.slug}>
            <div key={index} >
              <CourseItem course={item} />
            </div>
          </Link>
        ))
          : [1, 2, 3, 4, 5, 6, 7].map((item, index) => (
            <div key={index} className='w-full h-[240px] rounded-xl m-2 bg-slate-200 animate-pulse'>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default CourseList
















