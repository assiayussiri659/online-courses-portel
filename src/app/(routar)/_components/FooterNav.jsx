import React from 'react'
import SideNav from './SideNav'

function FooterNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white shadow-md border-t">
      <SideNav className="flex flex-row justify-around p-2 h-16" />
    </div>
  )
}

export default FooterNav
