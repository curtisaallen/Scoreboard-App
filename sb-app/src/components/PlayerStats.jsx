import React from 'react'

const PlayerStats = ({playername}) => {
  return (
    <div className="sb-player">
        <div className="sb-player-img">
        <span></span>
        </div>
        <div className="sb-player-stats">
        <h2>
            {playername[0].display_name}
            <span> {playername[0].team_abbreviation} - {playername[0].position}</span>
        </h2>
        <p>{playername[0].points} PTS,  {playername[0].offensive_rebounds + playername[0].defensive_rebounds}  REB,  {playername[0].assists} AST</p>
        </div>
   </div>
  )
}

export default PlayerStats