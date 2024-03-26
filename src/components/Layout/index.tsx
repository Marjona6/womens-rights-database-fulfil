import React, { useEffect } from 'react'

const Layout = ({ children }) => {
  useEffect(() => {
    const menuItem = document.querySelector(
      '.vp-antd-menu-item span a[href="/search"]'
    )
    if (menuItem) {
      console.log('found it', menuItem)
      menuItem.parentElement.classList.add('search-button')
    }
  }, [document])

  return <>{children}</>
}

export default Layout
