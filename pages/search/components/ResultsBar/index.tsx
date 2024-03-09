import React from 'react'

const RESULTS_TEXT = 'results'
const RESULT_TEXT = 'result'

const ResultsBar = ({ numberOfResults = 0 }) => {
  const numberToShow = numberOfResults || 'No'
  const wordToShow = numberOfResults === 1 ? RESULT_TEXT : RESULTS_TEXT
  return (
    <div className="flex w-screen ml-[-40px] pl-10 items-center bg-purple opacity-[60%] h-12 text-white">
      {numberToShow} {wordToShow}
    </div>
  )
}

export default ResultsBar
