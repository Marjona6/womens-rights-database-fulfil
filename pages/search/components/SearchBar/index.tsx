import React from 'react'

const PLACEHOLDER_TEXT =
  'Search by keyword, party name, case reference, jurisdiction name, or text in case summary...'

const SearchBar = ({ searchValue, setSearchValue }) => {
  return (
    <div className="flex w-full justify-center">
      <input
        className="w-[70%] border h-12 bg-[#F5F5F5] px-6 py-4 placeholder-black placeholder-opacity-[50%] placeholder-text-xs truncate"
        placeholder={PLACEHOLDER_TEXT}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
