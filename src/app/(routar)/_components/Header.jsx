"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BellDot, Search } from 'lucide-react';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For mobile menu
  const [isSearchOpen, setIsSearchOpen] = useState(false); // For toggling the search field on mobile
  const { data: session } = useSession();
  console.log("DATA from header", session);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsSearchOpen(false); // Close the search bar when the mobile menu is closed
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen); // Toggle search field on mobile
  };

  return (
    <header className="p-4 bg-white shadow-md flex justify-between items-center rounded-sm relative">

      {/* Logo or Brand */}
      {/* Add logo or brand name here if needed */}

      {/* Desktop Search Bar */}
      <div className="max-w-1xl hidden md:flex gap-2 border p-2 rounded-md">
        <Search className="h-5 w-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none"
        />
      </div>

      {/* Right-side icons and buttons */}
      <div className="flex items-center gap-4">

        {/* Notification Bell */}
        <BellDot className="text-gray-500 hidden md:block" />

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
                  Name: <span className='font-bold'>{session?.user?.name}</span>
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">
                  Email: <span className='font-bold'>{session?.user?.email}</span>
                </a>
                <button
                  onClick={handleSignOut}
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem">
                  Sign out
                </button>
              </div>
            )}
          </div>
        }

      </div>

      {/* Mobile Menu Button (Hamburger) */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden flex items-center gap-2"
      >
        <span className="text-gray-500">☰</span>
      </button>

      {/* Mobile Menu with Close Button */}
      {isMobileMenuOpen && (
        <div className="absolute top-0 left-0 w-full bg-white shadow-md md:hidden flex flex-col p-4 rounded-sm">
          <div className="flex justify-between items-center mb-4">
            {/* Close Button */}
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500"
            >
              <span className="text-xl">X</span>
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* Search Bar Toggle Icon */}
            {!isSearchOpen ? (
              <div className="flex items-center gap-2 border p-2 rounded-md cursor-pointer">
                <Search className="h-5 w-5 text-gray-500" onClick={toggleSearch} />
              </div>
            ) : (
              <div className="flex items-center gap-2 border p-2 rounded-md w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  className="outline-none w-full"
                />
                <button
                  onClick={toggleSearch}
                  className="text-gray-500"
                >
                  X
                </button>
              </div>
            )}

            {/* "Get Started" Button if Search is Open */}
            {isSearchOpen ? (
              <Link href={'/'}>
                <Button className="mt-4">Get Started</Button>
              </Link>
            ) : null}

            {/* Profile */}
            {session ? (
              <div className="flex flex-col items-start mt-4">
                <div className="text-gray-700 text-sm">
                  <strong>{session?.user?.name}</strong>
                </div>
                <div className="text-gray-500 text-xs">
                  {session?.user?.email}
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-red-500 mt-2"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link href={'/'}>
                <Button>Get Started</Button>
              </Link>
            )}
          </div>
        </div>
      )}

    </header>
  );
}

export default Header;
