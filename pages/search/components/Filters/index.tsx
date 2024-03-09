import React from 'react'
import Select from 'react-dropdown-select'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// TODO get these items from DB?
const LANGUAGE_ITEMS = [
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'All EU', label: 'All EU' },
  { value: 'Italian', label: 'Italian' },
]
const NATIONALITY_ITEMS = []
const JURISDICTION_ITEMS = []

const Filters = () => {
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

  return (
    <div className="flex w-screen ml-[-40px] pl-10 items-center h-12 outline">
      <Select
        multi
        placeholder="Language"
        options={LANGUAGE_ITEMS}
        onChange={(values) => setLanguageValues(values)}
        values={languageValues}
        style={{ border: 'none' }} // TODO more styling, esp. of options
      />
      <Select
        multi
        placeholder="Nationality of Plaintiff"
        options={NATIONALITY_ITEMS}
        onChange={(values) => setNationalityValues(values)}
        values={nationalityValues}
        style={{ border: 'none' }} // TODO more styling, esp. of options
      />
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      <Select
        multi
        placeholder="Jurisdiction"
        options={JURISDICTION_ITEMS}
        onChange={(values) => setJurisdictionValues(values)}
        values={jurisdictionValues}
        style={{ border: 'none' }} // TODO more styling, esp. of options
      />
    </div>
  )
}

export default Filters
