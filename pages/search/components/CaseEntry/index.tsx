import React from 'react'

const CaseEntry = (c) => {
  console.log({ c })
  return (
    <div className="flex flex-col w-full pb-10 outline text-black">
      <div className="w-full">{c.case.party_names}</div>
      <div className="w-full">Case reference: {c.case.case_number}</div>
      <div className="w-full">
        Legal status of plaintiff: {c.case.plaintiff_legal_status}
      </div>
      <div className="w-full">
        Nationality of plaintiff: {c.case.plaintiff_ethnicity}
      </div>
      <div className="w-full">
        Name of Jurisdiction: {c.case.name_of_jurisdiction}
      </div>
      {/* TODO: come back to this; language_of_decision is an array; must input
      manually for now */}
      <div className="w-full">
        Language of Decision: {c.case.language_of_decision}
      </div>
      {/* TODO: format this date in some way */}
      <div className="w-full">Date of decision: {c.case.date_of_decision}</div>
      <div className="w-full">
        Article(s) of the charter of fundamental rights of the EU:{' '}
        {c.case.eu_fundamental_rights_charter_articles?.join(', ')}
      </div>
    </div>
  )
}

export default CaseEntry
