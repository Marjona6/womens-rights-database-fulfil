import React, { useEffect } from 'react'
import './index.css'

const Layout = ({ children }) => {
  useEffect(() => {
    const menuItem = document.querySelector(
      '.vp-antd-menu-item span a[href="/search"]'
    )
    if (menuItem) {
      menuItem.parentElement.classList.add('search-button')
    }
  }, [document])

  return <>{children}</>
}

export default Layout
