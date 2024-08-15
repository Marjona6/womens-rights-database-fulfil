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
      <p>
        Note: The following survey aims to gather case law related to migrant
        women’s fundamental rights violation in the EU. All answers are optional
        and cases can cover different jurisdictions.
      </p>
      <div className="flex justify-center m-4">
        <a
          href="https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAO__QntMuVURjQ5SDk3OTNQS01UUVpXVFI0N09QN1dYMS4u"
          target="_blank"
        >
          <button className="bg-purple text-white px-4 py-2 rounded-full hover:bg-lightpurple">
            Submit a Case
          </button>
        </a>
      </div>
    </Layout>
  )
}

export default Resources
