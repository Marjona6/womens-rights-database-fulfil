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
      <div className="mb-[240px]">{children}</div>
      <div className="absolute bg-gray-300 h-[200px] w-screen bottom-0 left-0 px-6 md:px-10 pb-10">
        <div className="flex md:gap-x-10 justify-between md:justify-start absolute bottom-10 text-sm">
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
