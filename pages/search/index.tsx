import React from 'react'
import SearchBar from './components/SearchBar'
import ResultsBar from './components/ResultsBar'

const SearchPage = () => {
  return (
    <div className="">
      <SearchBar />
      filters go here
      <ResultsBar numberOfResults={5} />
    </div>
  )
}

export default SearchPage
