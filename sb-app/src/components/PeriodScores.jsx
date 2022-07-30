import React from 'react'

const PeriodScores = ({team, periodscores, classvalue}) => {
  return (
    <ul className={classvalue}>
    <li className="date-time">
      <h2>
        <span className="sb-team-short">{team.first_name}</span>
      </h2>
    </li>
    {periodscores.map((data, key) => <li className="score" key={key}>{data}</li>)}
    <li className="total">
        <span>{periodscores.reduce((a, b) => a + b, 0)}</span>
    </li>
  </ul>
  )
}

export default PeriodScores