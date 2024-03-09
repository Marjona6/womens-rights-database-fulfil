import React from 'react'
import SearchBar from './components/SearchBar'
import ResultsBar from './components/ResultsBar'
import Filters from './components/Filters'

const SearchPage = () => {
  return (
    <div className="">
      <SearchBar />
      <Filters />
      <ResultsBar numberOfResults={5} />
    </div>
  )
}

export default SearchPage
