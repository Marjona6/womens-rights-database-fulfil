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
  }, [])

  return (
    <>
      <div className="mb-[240px]">{children}</div>
      <div className="absolute bg-gray-300 h-[200px] w-screen bottom-0 left-0 px-6 md:px-10 pb-10">
        <div className="w-full flex items-center justify-between gap-x-2 md:gap-x-4 mt-4 flex-wrap">
          <img
            src="/images/FULFIL_transparent.png"
            alt="FULFIL logo"
            height={100}
            width={100}
            className="w-[50px] sm:w-[65px] md:w-[72px] lg:w-[100px]"
          />
          <img
            src="/images/ENoMW_transparent.png"
            alt="ENoMW logo"
            height={100}
            width={100}
            className="w-[50px] sm:w-[65px] md:w-[72px] lg:w-[100px]"
          />
          <img
            src="/images/partner-logos/ewla.png"
            alt="EWLA logo"
            height={100}
            width={100}
            className="w-[50px] sm:w-[65px] md:w-[72px] lg:w-[100px]"
          />
          <img
            src="/images/partner-logos/iroko.png"
            alt="IROKO logo"
            height={100}
            width={100}
            className="w-[50px] sm:w-[65px] md:w-[72px] lg:w-[100px]"
          />
          <img
            src="/images/partner-logos/chiara-parolin.jpeg"
            alt="Parolin logo"
            height={100}
            width={100}
            className="w-[50px] sm:w-[65px] md:w-[72px] lg:w-[100px]"
          />
          <img
            src="/images/partner-logos/olympe.png"
            alt="Olympe logo"
            height={100}
            width={100}
            className="w-[50px] sm:w-[65px] md:w-[72px] lg:w-[100px]"
          />
          <img
            src="/images/partner-logos/acf.png"
            alt="ACF logo"
            height={100}
            width={100}
            className="w-[50px] sm:w-[65px] md:w-[72px] lg:w-[100px]"
          />
          <img
            src="/images/eu-emblems/vertical/PNG/EN V Co-funded by_PANTONE.png"
            alt="EU emblem"
            height={100}
            width={100}
            className="w-[50px] sm:w-[65px] md:w-[72px] lg:w-[100px]"
          />
        </div>
        <div className="flex md:gap-x-10 justify-between md:justify-start absolute bottom-10 text-xs w-[calc(100%-48px)] md:w-[calc(100%-80px)]">
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
