import React from 'react'
import ThumbnailGallery from './ThumbnailGallery'

const Resources = ({ children }) => {
  return (
    <div>
      <h1 className="text-[32px] font-semibold mb-4">Resources</h1>
      <ThumbnailGallery />
      {children}
    </div>
  )
}

export default Resources
