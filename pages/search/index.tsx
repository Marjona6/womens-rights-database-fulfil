import React, { useEffect } from 'react'
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
  const [startDate, setStartDate] = React.useState()
  const [endDate, setEndDate] = React.useState()
  const [jurisdictionValues, setJurisdictionValues] = React.useState<
    { value: string; label: string }[]
  >([])

  // search bar
  const [searchValue, setSearchValue] = React.useState('')

  // filter options
  const [availableNationalities, setAvailableNationalities] = React.useState([])
  const [availableJurisdictions, setAvailableJurisdictions] = React.useState([])

  // data fetching
  const supabase = createClient(API_URL, API_KEY)
  const [cases, setCases] = React.useState([])

  React.useEffect(() => {
    let filterString = ''

    // nationality
    if (nationalityValues.length > 0) {
      const formattedNationalities = nationalityValues
        .map((val) => `plaintiff_ethnicity.eq."${val.value}"`)
        .join(',')
      filterString += formattedNationalities
    }

    // jurisdiction
    if (jurisdictionValues.length > 0) {
      const formattedJurisdictions = jurisdictionValues
        .map((val) => `name_of_jurisdiction.eq."${val.value}"`)
        .join(',')
      filterString += (filterString ? ',' : '') + formattedJurisdictions
    }

    filterCases(filterString, startDate)
  }, [nationalityValues, startDate, jurisdictionValues])

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

  const filterCases = async (filters, sDate) => {
    let query = supabase.from('cases').select('*')

    if (sDate) {
      query = query.gte('date_of_decision', sDate.toISOString())
    }

    if (filters.length > 0) {
      query = query.or(filters)
    }

    try {
      const { data: cases, error } = await query

      if (error) {
        console.error(error)
        return
      }

      setCases(cases)
    } catch (error) {
      console.error('Error filtering cases:', error.message)
    }
  }

  const performTextSearch = (val) => {
    if (!val) return
    const filteredCases = cases.filter((c) =>
      c.case_summary?.toLowerCase().includes(val?.toLowerCase())
    )
    setCases(filteredCases)
  }

  useEffect(() => {
    performTextSearch(searchValue)
  }, [searchValue])

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
          <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
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
