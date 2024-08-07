import React, { useState } from 'react'

const pdfFiles = [
  {
    title: 'FACTSHEETS_FULFIL_Equality_between_women_and_men',
    src: '/factsheets/FACTSHEETS_FULFIL_Equality_between_women_and_men.pdf',
  },
  {
    title: 'FACTSHEETS_FULFIL_Healthcare',
    src: '/factsheets/FACTSHEETS_FULFIL_Healthcare.pdf',
  },
  {
    title: 'FACTSHEETS_FULFIL_Human_Dignity',
    src: '/factsheets/FACTSHEETS_FULFIL_Human_Dignity.pdf',
  },
  {
    title: 'FACTSHEETS_FULFIL_Non-discrimination',
    src: '/factsheets/FACTSHEETS_FULFIL_Non-discrimination.pdf',
  },
  {
    title: 'FACTSHEETS_FULFIL_Prohibition_of_Slavery_and_forced_labour',
    src: '/factsheets/FACTSHEETS_FULFIL_Prohibition_of_Slavery_and_forced_labour.pdf',
  },
  {
    title: 'FACTSHEETS_FULFIL_Prohibition_of_Torture',
    src: '/factsheets/FACTSHEETS_FULFIL_Prohibition_of_Torture.pdf',
  },
  {
    title: 'FACTSHEETS_FULFIL_Recommendations_to_MS',
    src: '/factsheets/FACTSHEETS_FULFIL_Recommendations_to_MS.pdf',
  },
  {
    title: 'FACTSHEETS_FULFIL_Right_to_Life',
    src: '/factsheets/FACTSHEETS_FULFIL_Right_to_Life.pdf',
  },
  {
    title: 'FACTSHEETS_FULFIL_Right_to_respect_for_private_and_family_life',
    src: '/factsheets/FACTSHEETS_FULFIL_Right_to_respect_for_private_and_family_life.pdf',
  },
  {
    title: 'FACTSHEETS_FULFIL_Terminology',
    src: '/factsheets/FACTSHEETS_FULFIL_Terminology.pdf',
  },
]

const ThumbnailGallery = () => {
  const [selectedPdf, setSelectedPdf] = useState(null)

  const handleButtonClick = (pdf) => {
    setSelectedPdf(pdf)
  }

  return (
    <div>
      {selectedPdf && (
        <div className="mt-8">
          <iframe
            src={selectedPdf.src}
            type="application/pdf"
            height="600"
            width="100%"
            className="w-full"
          />
        </div>
      )}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pdfFiles.map((pdf) => (
          <button
            key={pdf.src}
            className="bg-[#404080] text-white py-2 px-4 rounded-md hover:bg-[#6060a0] focus:outline-none"
            onClick={() => handleButtonClick(pdf)}
          >
            {pdf.title
              .replace('FACTSHEETS_FULFIL_', '')
              .replace('.pdf', '')
              .replace(/_/g, ' ')}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ThumbnailGallery
