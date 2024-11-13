"use client"
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
  
  // Fetch Course List Data
  const getAllCourses = () => {
    GlobalApi.getAllCourseList().then(resp => {
      setCorurseList(resp?.data.courseLists)
    })
  }

  return (
    <div className='p-5 bg-white rounded-lg mt-5 w-full'>
      {/* Title and Filter Section */}
      <div className='flex flex-col sm:flex-row items-center justify-between sm:space-x-4'>
        <h2 className='text-[20px] font-bold text-primary mb-4 sm:mb-0'>All Courses</h2>
        <Select>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">All</SelectItem>
            <SelectItem value="dark">Paid</SelectItem>
            <SelectItem value="system">Free</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Display Course List */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
        {courseList?.length > 0 ? courseList.map((item, index) => (
          <Link href={'course-preview/' + item.slug} key={index}>
            <div>
              <CourseItem course={item} />
            </div>
          </Link>
        ))
        : [1, 2, 3, 4, 5, 6, 7].map((item, index) => (
          <div key={index} className='w-full h-[240px] rounded-xl m-2 bg-slate-200 animate-pulse'>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseList;
