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
  const [allCases, setAllCases] = React.useState([])
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

    filterCases(filterString, startDate, endDate)
  }, [nationalityValues, startDate, endDate, jurisdictionValues])

  const filterCases = async (filters, sDate, eDate) => {
    let query = supabase.from('cases').select('*')

    if (sDate) {
      query = query.gte('date_of_decision', sDate.toISOString())
    }

    if (eDate) {
      query = query.lte('date_of_decision', eDate.toISOString())
    }

    if (filters.length > 0) {
      query = query.or(filters)
    }

    try {
      const { data: casesData, error } = await query

      if (error) {
        console.error(error)
        return
      }

      setAllCases(casesData)
      setCases(casesData)

      const availNationalities = casesData?.length
        ? [
            ...new Set(
              casesData
                .map((c) => c?.plaintiff_ethnicity)
                .filter((val) => val !== null && val !== '-')
                .sort()
            ),
          ]
        : []
      setAvailableNationalities(availNationalities)

      const availJurisdictions = casesData?.length
        ? [
            ...new Set(
              casesData
                .map((c) => c?.name_of_jurisdiction)
                .filter((val) => val !== null && val !== '-')
                .sort()
            ),
          ]
        : []
      setAvailableJurisdictions(availJurisdictions)
    } catch (error) {
      console.error('Error filtering cases:', error.message)
    }
  }

  const performTextSearch = (val) => {
    if (val === '') setCases(allCases)
    else {
      const filteredCases = cases.filter(
        (c) =>
          c.case_summary?.toLowerCase().includes(val?.toLowerCase()) ||
          c.party_names?.toLowerCase().includes(val?.toLowerCase()) ||
          c.subject_matter?.toLowerCase().includes(val?.toLowerCase())
      )
      setCases(filteredCases)
    }
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
