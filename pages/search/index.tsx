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

type FiltersType = {
  plaintiff_ethnicity?: string[]
  country?: string[]
  name_of_jurisdiction?: string[]
  language_of_decision?: string
  eu_fundamental_rights_charter_articles?: string
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
  const [euCharterArticles, setEuCharterArticles] = React.useState<
    { value: string; label: string }[]
  >([])

  // search bar
  const [searchValue, setSearchValue] = React.useState('')

  // filter options
  const [availableNationalities, setAvailableNationalities] = React.useState([])
  const [availableJurisdictions, setAvailableJurisdictions] = React.useState([])
  const [availableCountries, setAvailableCountries] = React.useState<any[]>([])
  const [availableEuCharterArticles, setAvailableEuCharterArticles] =
    React.useState([])
  const [withEuCharter, setWithEuCharter] = React.useState(false)

  // keep track of first data fetch
  const [hasFetchedOnce, setHasFetchedOnce] = React.useState(false)

  // data fetching
  const supabase = createClient(API_URL, API_KEY)
  const [allCases, setAllCases] = React.useState([])
  const [cases, setCases] = React.useState([])

  React.useEffect(() => {
    let filters: FiltersType = {}

    if (nationalityValues.length > 0) {
      filters.plaintiff_ethnicity = nationalityValues.map((val) => val.value)
    }
    if (countryValues.length > 0) {
      filters.country = countryValues.map((val) => val.value)
    }
    if (jurisdictionValues.length > 0) {
      filters.name_of_jurisdiction = jurisdictionValues.map((val) => val.value)
    }
    if (languageValues.length > 0) {
      filters.language_of_decision = languageValues
        .map((val) => val.value)
        .join(',')
    }
    if (euCharterArticles.length > 0) {
      filters.eu_fundamental_rights_charter_articles = euCharterArticles
        .map((val) => val.value)
        .join(',')
    }

    filterCases(filters, startDate, endDate, withEuCharter)
  }, [
    nationalityValues,
    startDate,
    endDate,
    jurisdictionValues,
    withEuCharter,
    languageValues,
    countryValues,
    euCharterArticles,
  ])

  const filterCases = async (filters: FiltersType, sDate, eDate, euCharter) => {
    let query = supabase.from('cases').select('*')

    if (sDate) {
      query = query.gte('date_of_decision', sDate.toISOString())
    }

    if (eDate) {
      query = query.lte('date_of_decision', eDate.toISOString())
    }

    if (euCharter) {
      query = query.not('eu_fundamental_rights_charter_articles', 'is', null)
      query = query.not('eu_fundamental_rights_charter_articles', 'eq', '{}') // checks for empty array
    }

    if (filters.plaintiff_ethnicity?.length > 0) {
      query = query.in('plaintiff_ethnicity', filters.plaintiff_ethnicity)
    }

    if (filters.country?.length > 0) {
      query = query.in('country', filters.country)
    }

    if (filters.name_of_jurisdiction?.length > 0) {
      query = query.in('name_of_jurisdiction', filters.name_of_jurisdiction)
    }

    if (filters.language_of_decision?.length > 0) {
      query = query.overlaps('language_of_decision', [
        filters.language_of_decision,
      ])
    }

    if (filters.eu_fundamental_rights_charter_articles?.length > 0) {
      query = query.contains('eu_fundamental_rights_charter_articles', [
        filters.eu_fundamental_rights_charter_articles,
      ])
    }

    try {
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
      if (!hasFetchedOnce) setAvailableNationalities(availNationalities)

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
      if (!hasFetchedOnce) setAvailableCountries(availCountries)

      const availEuCharterArticles = casesData?.length
        ? [
            ...new Set(
              casesData
                .flatMap((c) => c?.eu_fundamental_rights_charter_articles)
                .filter(
                  (article, index, self) => self.indexOf(article) === index
                )
            ),
          ]
            .sort((a, b) => a - b)
            .map((article) => article.toString())
        : []

      if (!hasFetchedOnce) setAvailableEuCharterArticles(availEuCharterArticles)

      setHasFetchedOnce(true)
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

  const createOptions = (arr) => {
    const uniqueItems = new Set(arr.map((item) => item.trim()))
    return Array.from(uniqueItems).map((item) => ({ label: item, value: item }))
  }

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

  const euCharterOptions = React.useMemo(
    () => createOptions(availableEuCharterArticles),
    [availableEuCharterArticles]
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
          euCharterArticles={euCharterArticles}
          setEuCharterArticles={setEuCharterArticles}
          euCharterOptions={euCharterOptions}
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
