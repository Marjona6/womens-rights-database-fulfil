import React from 'react'
import Layout from '../../layout'

const Project = ({ children }) => {
  return (
    <Layout>
      <div className="!list-disc">{children}</div>
    </Layout>
  )
}

export default Project
