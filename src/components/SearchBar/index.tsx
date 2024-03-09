import React from 'react'

const PLACEHOLDER_TEXT =
  'Search by keyword, party name, case reference, jurisdiction name, or text in case summary...'

const SearchBar = () => {
  return (
    <div className="bg-green w-full h-[80px] md:h-[100px] fixed top-0 px-6 flex items-center">
      <input className="w-[70%]" placeholder={PLACEHOLDER_TEXT} />
    </div>
  )
}

export default SearchBar
