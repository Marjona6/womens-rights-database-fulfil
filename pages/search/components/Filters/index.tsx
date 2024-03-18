import React from 'react'
import Select from 'react-dropdown-select'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// TODO get these items from DB?
const LANGUAGE_ITEMS = [
  { value: 'All EU', label: 'All EU' },
  { value: 'Bulgarian', label: 'Bulgarian' },
  { value: 'Croatian', label: 'Croatian' },
  { value: 'Czech', label: 'Czech' },
  { value: 'Danish', label: 'Danish' },
  { value: 'Dutch', label: 'Dutch' },
  { value: 'English', label: 'English' },
  { value: 'Estonian', label: 'Estonian' },
  { value: 'Finnish', label: 'Finnish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Greek', label: 'Greek' },
  { value: 'Hungarian', label: 'Hungarian' },
  { value: 'Irish', label: 'Irish' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Latvian', label: 'Latvian' },
  { value: 'Lithuanian', label: 'Lithuanian' },
  { value: 'Maltese', label: 'Maltese' },
  { value: 'Polish', label: 'Polish' },
  { value: 'Portuguese', label: 'Portuguese' },
  { value: 'Romanian', label: 'Romanian' },
  { value: 'Slovak', label: 'Slovak' },
  { value: 'Slovenian', label: 'Slovenian' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'Swedish', label: 'Swedish' },
]

const Filters = ({
  languageValues,
  setLanguageValues,
  nationalityValues,
  setNationalityValues,
  nationalityOptions,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  jurisdictionValues,
  setJurisdictionValues,
  jurisdictionOptions,
}) => {
  // TODO think about this some more; might not need to worry about this here
  // ... and just handle it when calling the API
  const handleSetLanguageValues = (vals) => {
    // console.log(vals)
    if (vals.includes(LANGUAGE_ITEMS[0])) setLanguageValues(LANGUAGE_ITEMS)
    else setLanguageValues(vals)
  }

  return (
    <div className="flex w-screen ml-[-40px] pl-10 gap-2 items-center h-12">
      <Select
        multi
        placeholder="Language"
        options={LANGUAGE_ITEMS}
        onChange={(values) => handleSetLanguageValues(values)}
        values={languageValues}
        style={{ border: 'none' }} // TODO more styling, esp. of options
      />
      <Select
        multi
        placeholder="Nationality of Plaintiff"
        options={nationalityOptions}
        onChange={(values) => setNationalityValues(values)}
        values={nationalityValues}
        style={{ border: 'none' }} // TODO more styling, esp. of options
      />
      <div className="flex flex-col">
        <label className="text-xs text-gray-800">Start date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-gray-800">End date</label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>
      <Select
        multi
        placeholder="Jurisdiction"
        options={jurisdictionOptions}
        onChange={(values) => setJurisdictionValues(values)}
        values={jurisdictionValues}
        style={{ border: 'none' }} // TODO more styling, esp. of options
      />
    </div>
  )
}

export default Filters
