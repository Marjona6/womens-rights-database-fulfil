import React from 'react'
import Layout from '../../layout'

const Project = ({ children }) => {
  return (
    <Layout>
      About the project
      <img
        src="/images/project-logos/white-bg.png"
        alt="FULFIL logo"
        height={75}
        width={75}
      />
      <div className="!list-disc">{children}</div>
    </Layout>
  )
}

export default Project
