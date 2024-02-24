import React from 'react'
import { createTheme } from 'vite-pages-theme-doc'
import '../src/index.css'

export default createTheme({
  logo: (
    <div>
      <img
        src="/images/project-logos/white-bg.png"
        alt="FULFIL logo"
        height={75}
        width={75}
      />
    </div>
  ),
  topNavs: [
    { label: 'Home', path: '/' },
    {
      label: 'About Us',
      path: '/about/project',
      activeIfMatch: '/about',
    },
    {
      label: "Migrant Women's Fundamental Rights in the EU",
      path: '/rights/report',
      activeIfMatch: '/rights',
    },
    {
      label: 'Search the Database',
      path: '/search',
      activeIfMatch: '/search',
    },
  ],
})
