import React from 'react'
import ThumbnailGallery from './ThumbnailGallery'
import Layout from '../../layout'

const Resources = ({ children }) => {
  return (
    <Layout>
      <h1 className="text-[32px] font-semibold mb-4">Resources</h1>
      Click the name of any fact sheet to view it.
      <ThumbnailGallery />
      {children}
    </Layout>
  )
}

export default Resources
