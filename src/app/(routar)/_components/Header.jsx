"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BellDot, Search } from 'lucide-react';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  console.log("DATA from header", session)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <header className="p-4 bg-white shadow-md flex justify-between items-center rounded-sm">
      {/* Logo or Brand */}
      {/* Search bar */}
      <div className="hidden md:flex gap-2 border p-2 rounded-md">
        <Search className="h-5 w-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none"
        />
      </div>

      {/* Right-side icons and buttons */}

      <div className="flex items-center gap-4">
        <BellDot className="text-gray-500" />
        {!session &&
          <>
            <Link href={'/'}>
              <Button>Get Started</Button>
            </Link>
          </>

        }


        {/* User Profile Button */}

        {session &&

          <div className="relative ml-3">
            <button
              onClick={toggleMenu}
              type="button"
              className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              id="user-menu-button"
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
            >
              <span className="sr-only">Open user menu</span>
              <h1 className="flex items-center justify-center h-8 w-8 rounded-full text-white bg-gray-800">
                {session.user.email.slice(0, 1).toUpperCase()}
              </h1>


              {/* <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User profile"
              /> */}
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-72 h-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                  name: <span className='font-bold'>{session?.user?.name}</span>
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                  Email: <span className='font-bold'>{session?.user?.email}</span>
                </a>
                <button
                  onClick={(e) => handleSignOut()}
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem">
                  Sign out
                </button>
              </div>
            )}
          </div>
        }

      </div>

      {/* Mobile Search bar */}
      <div className="flex md:hidden w-full mt-4">
        <div className="flex gap-2 border p-2 rounded-md w-full">
          <Search className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none w-full"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
