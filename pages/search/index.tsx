import React, { useEffect } from 'react'
import SearchBar from './components/SearchBar'
import ResultsBar from './components/ResultsBar'
import Filters from './components/Filters'
import CaseEntry from './components/CaseEntry'
import Layout from '../layout'
import { API_URL, API_KEY } from '../url'

import { createClient } from '@supabase/supabase-js'

const isEmpty = (value) => {
  if (value === null || value === false || value === '') {
    return true
  }
  if (Array.isArray(value) && value.length === 0) {
    return true
  }
  if (
    typeof value === 'object' &&
    value !== null &&
    Object.keys(value).length === 0
  ) {
    return true
  }
  return false
}

const filterNonEmptyObjects = (arr) => {
  return arr.filter((obj) => {
    const objectWithoutIdAndCreatedAt = { ...obj }
    delete objectWithoutIdAndCreatedAt.id
    delete objectWithoutIdAndCreatedAt.created_at
    // Check if every property in the object is empty
    const allPropertiesEmpty = Object.values(objectWithoutIdAndCreatedAt).every(
      isEmpty
    )
    // Only include objects that have at least one non-empty property
    return !allPropertiesEmpty
  })
}

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
  const [countryValues, setCountryValues] = React.useState<
    {
      value: string
      label: string
    }[]
  >([])
  const [jurisdictionValues, setJurisdictionValues] = React.useState<
    { value: string; label: string }[]
  >([])

  // search bar
  const [searchValue, setSearchValue] = React.useState('')

  // filter options
  const [availableNationalities, setAvailableNationalities] = React.useState([])
  const [availableJurisdictions, setAvailableJurisdictions] = React.useState([])
  const [availableCountries, setAvailableCountries] = React.useState<any[]>([])
  const [withEuCharter, setWithEuCharter] = React.useState(false)

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

    // country
    if (countryValues.length) {
      const formattedCountries = countryValues
        .map((val) => `country.eq."${val.value}"`)
        .join(',')
      filterString += formattedCountries
    }

    // jurisdiction
    if (jurisdictionValues.length > 0) {
      const formattedJurisdictions = jurisdictionValues
        .map((val) => `name_of_jurisdiction.eq."${val.value}"`)
        .join(',')
      filterString += (filterString ? ',' : '') + formattedJurisdictions
    }

    // languages
    if (languageValues.length > 0) {
      const languageFilter = languageValues
        .map((lang) => `language_of_decision.cs.{"${lang.value}"}`)
        .join(', ')
      filterString += (filterString ? ',' : '') + languageFilter
    }

    filterCases(filterString, startDate, endDate, withEuCharter)
  }, [
    nationalityValues,
    startDate,
    endDate,
    jurisdictionValues,
    withEuCharter,
    languageValues,
    countryValues,
  ])

  const filterCases = async (filters, sDate, eDate, euCharter) => {
    let query = supabase.from('cases2').select('*')

    if (sDate) {
      query = query.gte('date_of_decision', sDate.toISOString())
    }

    if (eDate) {
      query = query.lte('date_of_decision', eDate.toISOString())
    }

    if (euCharter) {
      query = query.not('eu_fundamental_rights_charter_articles', 'is', null)
    }

    if (filters.length > 0) {
      query = query.or(filters)
    }

    // hack to get results to work as desired
    const modifyUrl = (url) => {
      const modifiedUrl = url.replace(/select=\*&or=/, 'select=*&and=')
      return modifiedUrl
    }
    try {
      query.url.href = modifyUrl(query.url.href)
      const { data: casesData, error } = await query

      if (error) {
        console.error(error)
        return
      }

      setAllCases(filterNonEmptyObjects(casesData))
      setCases(filterNonEmptyObjects(casesData))

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
      const availCountries = casesData?.length
        ? [
            ...new Set(
              casesData
                .map((c) => c?.country)
                .filter((val) => val !== null && val !== '-')
                .sort()
            ),
          ]
        : []
      setAvailableCountries(availCountries)
    } catch (error) {
      console.error('Error filtering cases:', error.message)
    }
  }

  const performTextSearch = (val, availableCases) => {
    if (val === '') setCases(availableCases)
    else {
      const filteredCases = availableCases.filter(
        (c) =>
          c.case_summary?.toLowerCase().includes(val?.toLowerCase()) ||
          c.party_names?.toLowerCase().includes(val?.toLowerCase()) ||
          c.subject_matter?.toLowerCase().includes(val?.toLowerCase())
      )
      setCases(filteredCases)
    }
  }

  useEffect(() => {
    performTextSearch(searchValue, allCases)
  }, [searchValue, allCases])

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

  const countryOptions = React.useMemo(
    () => createOptions(availableCountries),
    [availableCountries]
  )

  return (
    <Layout>
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
          withEuCharter={withEuCharter}
          setWithEuCharter={setWithEuCharter}
          countryOptions={countryOptions}
          countryValues={countryValues}
          setCountryValues={setCountryValues}
        />
        <ResultsBar numberOfResults={cases?.length} />
      </div>
      {cases?.map((c) => (
        <CaseEntry key={c.id} case={c} />
      ))}
    </Layout>
  )
}

export default SearchPage
