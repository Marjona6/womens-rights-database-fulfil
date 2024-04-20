import React, { useEffect } from 'react'
import './index.css'
import { Link } from 'react-router-dom'

const Layout = ({ children }) => {
  useEffect(() => {
    const menuItem = document.querySelector(
      '.vp-antd-menu-item span a[href="/search"]'
    )
    if (menuItem) {
      menuItem.parentElement.classList.add('search-button')
    }
  }, [document])

  return (
    <>
      {children}
      <div className="absolute bg-gray-300 h-[200px] w-screen ml-[-40px] bottom-0 px-10 pb-10">
        <div className="flex gap-x-10 absolute bottom-10">
          <div>Copyright ©2024 FULFIL</div>
          <Link to="/legal-and-privacy" className="underline">
            Legal and Privacy Information
          </Link>
        </div>
      </div>
    </>
  )
}

export default Layout
