"use client";
import { BadgeIcon, BookOpen, GraduationCap, LayoutGrid, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
 import React, { useEffect } from 'react';
import { useSession } from "next-auth/react";
import DashboardPage from '../dashboard/page';

function SideNav({ className }) {
  const { data: session } = useSession();
  const path = usePathname();

  useEffect(() => {
    console.log("path", path);
  }, [path]);


  const menu = [
    {
      id: 6,
      name: 'Dashboard',
      icon: LayoutGrid,
      path: '/dashboard',
      auth: session
    },
    {
      id: 1,
      name: 'All Courses',
      icon: BookOpen,
      path: '/courses',
      auth: true
    },
    {
      id: 4,
      name: 'Store',
      icon: LayoutGrid,
      path: '/store',
      auth: true
    },
    {
      id: 2,
      name: 'Membership',
      icon: BadgeIcon,
      path: '/quize',
      auth: true
    },
    {
      id: 3,
      name: 'Be Instructor',
      icon: GraduationCap,
      path: '/be-instructor',
      auth: true
    },
    {
      id: 5,
      name: 'Newsletter',
      icon: Mail,
      path: '/newsletter',
      auth: true
    },
  ];

  return (
    <div className={`p-5 bg-white shadow-sm border ${className}`}>
      <div className='flex justify-center sm:justify-start'>
        <Image src='/logo.svg' alt='logo' width={60} height={20} className='group-hover:animate-bounce' />
      </div>
      <hr className='mt-7' />
      <div className='mt-5'>
        {menu.map((item, index) => (
          item.auth &&  (
            <Link key={index} href={item.path}>
              <div className={`group flex gap-3 mt-2 p-3 text-[18px] items-center
              text-gray-500 cursor-pointer
              hover:bg-primary
              hover:text-white 
              rounded-md transition-all ease-in-out duration-200
              ${path.includes(item.path) && 'bg-primary text-white'}
              `}>
                <item.icon className='group-hover:animate-bounce' />
                <h2>{item.name}</h2>
              </div>
            </Link>
          )
        ))}
      </div>
    </div>
  );
}

export default SideNav;
