import React from 'react'
import { createTheme } from 'vite-pages-theme-doc'
import '../pages/index.css'
import NavBar from 'src/components/NavBar'

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
  logoLink: '/',
  search: false,
  topNavs: [
    {
      subMenu: 'About Us',
      children: [
        { label: 'Project', path: '/about/project' },
        { label: 'Partners', path: '/about/partners' },
        { label: 'Contact Us', path: '/about/contact' },
      ],
    },
    {
      subMenu: "Migrant Women's Fundamental Rights in the EU",
      children: [
        {
          label:
            "Women's perspective on the EU charter of fundamental rights (report)",
          path: '/rights/report',
        },
        {
          label:
            "Training program on migrant women's fundamental rights protection (training outline)",
          path: '/rights/training',
        },
        {
          label: 'Info Sheets / Resources / Videos',
          path: '/rights/resources',
        },
      ],
    },
    {
      label: 'Search the Database',
      path: '/search',
      activeIfMatch: '/search',
    },
  ],
  sideNavs: [],
})
