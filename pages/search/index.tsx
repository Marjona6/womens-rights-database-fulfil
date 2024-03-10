import React from 'react'
import SearchBar from './components/SearchBar'
import ResultsBar from './components/ResultsBar'
import Filters from './components/Filters'
import CaseEntry from './components/CaseEntry'
import { API_URL, API_KEY } from '../../api/url'

import { createClient } from '@supabase/supabase-js'

const SearchPage = () => {
  // filtering
  const [languageValues, setLanguageValues] = React.useState<
    { value: string; label: string }[]
  >([])
  const [nationalityValues, setNationalityValues] = React.useState<
    { value: string; label: string }[]
  >([])
  const [startDate, setStartDate] = React.useState(new Date())
  const [endDate, setEndDate] = React.useState(new Date())
  const [jurisdictionValues, setJurisdictionValues] = React.useState<
    { value: string; label: string }[]
  >([])

  // filter options
  const [availableNationalities, setAvailableNationalities] = React.useState([])
  const [availableJurisdictions, setAvailableJurisdictions] = React.useState([])

  // data fetching
  const supabase = createClient(API_URL, API_KEY)
  const [cases, setCases] = React.useState([])
  // initial fetch
  React.useEffect(() => {
    getCases()
  }, [])
  // subsequent fetches with filtering
  React.useEffect(() => {
    let formattedNationalities = ''
    if (nationalityValues.length > 0)
      formattedNationalities = nationalityValues
        .map((val) => `plaintiff_ethnicity.eq.${val.value}`)
        .join(',')
    console.log('formatted', formattedNationalities)
    if (nationalityValues.length === 0) getCases()
    else filterCases([formattedNationalities])
  }, [
    languageValues,
    nationalityValues,
    startDate,
    endDate,
    jurisdictionValues,
  ])
  async function getCases() {
    const { data: cases, error } = await supabase.from('cases').select('*')

    if (error) console.error(error)
    setCases(cases)
    const availNationalities = cases?.length
      ? [
          ...new Set(
            cases
              .map((c) => c?.plaintiff_ethnicity)
              .filter((val) => val !== null && val !== '-')
              .sort()
          ),
        ]
      : []
    setAvailableNationalities(availNationalities)
    const availJurisdictions = cases?.length
      ? [
          ...new Set(
            cases
              .map((c) => c?.name_of_jurisdiction)
              .filter((val) => val !== null && val !== '-')
              .sort()
          ),
        ]
      : []
    setAvailableJurisdictions(availJurisdictions)
  }
  async function filterCases(filters) {
    const { data: cases, error } = await supabase
      .from('cases')
      .select('*')
      .or(filters[0])
    if (error) console.error(error)
    setCases(cases)
  }

  const createOptions = (arr) =>
    arr.map((item) => ({ label: item, value: item }))

  const nationalityOptions = React.useMemo(
    () => createOptions(availableNationalities),
    [availableNationalities]
  )
  const jurisdictionOptions = React.useMemo(
    () => createOptions(availableJurisdictions),
    [availableJurisdictions]
  )

  return (
    <>
      <div className="flex flex-col gap-y-8">
        <div className="mb-14">
          <SearchBar />
        </div>
        <Filters
          languageValues={languageValues}
          setLanguageValues={setLanguageValues}
          nationalityValues={nationalityValues}
          setNationalityValues={setNationalityValues}
          nationalityOptions={nationalityOptions}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          jurisdictionValues={jurisdictionValues}
          setJurisdictionValues={setJurisdictionValues}
          jurisdictionOptions={jurisdictionOptions}
        />
        <ResultsBar numberOfResults={cases?.length} />
      </div>
      {cases?.map((c) => (
        <CaseEntry key={c.id} case={c} />
      ))}
    </>
  )
}

export default SearchPage
