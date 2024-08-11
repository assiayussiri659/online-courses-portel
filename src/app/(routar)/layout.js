import React from 'react'
import SideNav from './_components/SideNav'
import Header from './_components/Header'
import FooterNav from './_components/FooterNav'

function Layout({ children }) {
  return (
    <div className="relative h-screen flex flex-col md:flex-row">
      {/* Sidebar for desktop and hidden on mobile */}
      <div className="hidden md:block w-64">
        <SideNav className="h-screen" />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-y-auto p-4">
        <Header />
        {children}
      </div>

      {/* Mobile footer nav */}
      <FooterNav />
    </div>
  )
}

export default Layout
