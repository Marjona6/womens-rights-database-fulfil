import React from 'react'
import { Link } from 'react-router-dom'

const FIELD_LABEL_STYLE = 'text-gray-500 w-[30%]'
const FIELD_CONTENT_STYLE = 'w-[70%]'

const CaseEntry = (c) => {
  return (
    <div className="flex flex-col w-full py-10 border-gray-300 border-b-2 gap-y-2 text-black">
      <div className="w-full font-bold text-lg">{c.case.party_names}</div>
      <div className="w-full flex">
        <div className={FIELD_LABEL_STYLE}>Case reference:</div>
        <div className={FIELD_CONTENT_STYLE}>{c.case.case_number}</div>
      </div>
      <div className="w-full flex">
        <div className={FIELD_LABEL_STYLE}>Legal status of plaintiff:</div>
        <div className={FIELD_CONTENT_STYLE}>
          {c.case.plaintiff_legal_status}
        </div>
      </div>
      <div className="w-full flex">
        <div className={FIELD_LABEL_STYLE}>Nationality of plaintiff:</div>
        <div className={FIELD_CONTENT_STYLE}>{c.case.plaintiff_ethnicity}</div>
      </div>
      <div className="w-full flex">
        <div className={FIELD_LABEL_STYLE}>Name of Jurisdiction:</div>
        <div className={FIELD_CONTENT_STYLE}>{c.case.name_of_jurisdiction}</div>
      </div>
      {/* TODO: come back to this; language_of_decision is an array; must input
      manually for now */}
      <div className="w-full flex">
        <div className={FIELD_LABEL_STYLE}>Language of Decision:</div>
        <div>{c.case.language_of_decision}</div>
      </div>
      {/* TODO: format this date in some way? */}
      <div className="w-full flex">
        <div className={FIELD_LABEL_STYLE}>Date of decision:</div>
        <div className={FIELD_CONTENT_STYLE}>{c.case.date_of_decision}</div>
      </div>
      <div className="w-full flex">
        <div className={FIELD_LABEL_STYLE}>
          Article(s) of the charter of fundamental rights of the EU:
        </div>
        <div className={FIELD_CONTENT_STYLE}>
          {c.case.eu_fundamental_rights_charter_articles?.join(', ')}
        </div>
      </div>
      <div className="w-full flex">
        <div className={FIELD_LABEL_STYLE}>Other information:</div>
        <div className={FIELD_CONTENT_STYLE}>{c.case.landmark_case}</div>
      </div>
      <div className="w-full flex">
        <div className={FIELD_LABEL_STYLE}>Subject matter:</div>
        <div className={FIELD_CONTENT_STYLE}>{c.case.subject_matter}</div>
      </div>
      <div className="w-full">{c.case.case_summary}</div>
      {c.case.source ? (
        <Link
          to={c.case.source}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-500 cursor-pointer w-fit"
        >
          Link to full case
        </Link>
      ) : (
        <p className="text-gray-400">No link available</p>
      )}
    </div>
  )
}

export default CaseEntry
