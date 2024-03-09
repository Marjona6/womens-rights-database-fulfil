import React from 'react'
import SearchBar from './components/SearchBar'
import ResultsBar from './components/ResultsBar'
import Filters from './components/Filters'
import CaseEntry from './components/CaseEntry'
import { API_URL, API_KEY } from '../../api/url'

import { createClient } from '@supabase/supabase-js'

const SearchPage = () => {
  const supabase = createClient(API_URL, API_KEY)

  const [cases, setCases] = React.useState([])

  React.useEffect(() => {
    getCases()
  }, [])

  async function getCases() {
    const { data: cases, error } = await supabase.from('cases').select('*')

    if (error) console.error(error)
    setCases(cases)
  }

  console.log(cases)

  return (
    <div className="">
      <SearchBar />
      <Filters />
      <ResultsBar numberOfResults={cases.length} />
      {cases.map((c) => (
        <CaseEntry key={c.id} case={c} />
      ))}
    </div>
  )
}

export default SearchPage
