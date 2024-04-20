import React from 'react'
import Layout from '../../layout'

const Partners = ({ children }) => {
  return (
    <Layout>
      Partners
      <img
        src="/images/project-logos/white-bg.png"
        alt="FULFIL logo"
        height={75}
        width={75}
      />
      {children}
    </Layout>
  )
}

export default Partners
