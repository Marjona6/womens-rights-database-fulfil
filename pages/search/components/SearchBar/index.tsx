import React from 'react'

const PLACEHOLDER_TEXT =
  'Search by keyword, party name, case reference, jurisdiction name, or text in case summary...'

const SearchBar = ({ searchValue, setSearchValue }) => {
  return (
    <div className="flex w-full justify-center relative">
      <input
        className="w-[70%] border border-[#ccc] h-12 px-6 py-4 placeholder-black placeholder-opacity-[50%] text-lg truncate"
        placeholder={PLACEHOLDER_TEXT}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {!!searchValue ? (
        <button
          className="absolute right-[15vw] top-3 text-gray-500 font-bold px-2"
          onClick={() => setSearchValue('')}
        >
          X
        </button>
      ) : null}
    </div>
  )
}

export default SearchBar
