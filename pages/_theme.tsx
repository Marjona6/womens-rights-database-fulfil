import React from 'react'
import { createTheme } from 'vite-pages-theme-doc'
import './index.css'

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
        { label: 'FULFIL Project', path: '/about/project' },
        { label: 'Partners', path: '/about/partners' },
        { label: 'Contact Us', path: '/about/contact' },
      ],
    },
    {
      subMenu: "Migrant Women's Fundamental Rights in the EU",
      children: [
        {
          label: 'Women’s Rights Perspective on the EU Charter Report',
          path: '/rights/report',
        },
        {
          label: 'Training for Legal Practitioners and CSO',
          path: '/rights/training',
        },
        {
          label: 'Additional Resources',
          path: '/rights/resources',
        },
        {
          label: 'Submit a Case',
          path: '/rights/submit-a-case',
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
