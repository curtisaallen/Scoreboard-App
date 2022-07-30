import React, { useEffect, useState } from 'react';
import './App.css';
import PeriodScores from './PeriodScores';
import PlayerStats from './PlayerStats';
import SbLinks  from './SbLinks';
import PeriodScoresHeader from './PeriodScoresHeader';
import SbHeader from './SbHeader';
import { getNBA } from '../services/nba';


function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getNBA()
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);
  
  if (isLoading) {
    return <div className="container"><div className="loading-text">Loading...</div></div>;
  }

  return (
<div className="container">
<div className="container_left">
  <div className="container_left_top">
    <div className="score_container">
      <div className="score_container_top">
        <PeriodScoresHeader />
      </div>
      <div className="score_container_bottom">
        <PeriodScores team={ data.away_team } periodscores={data.away_period_scores} classvalue={'away'} />
        <PeriodScores team={ data.home_team } periodscores={data.home_period_scores} classvalue={'home'} />            
      </div>
    </div>
    <div className="score_container_player_info">
      <SbHeader />
      <div className="sb-content">

        <PlayerStats playername={data.away_stats} />
        <PlayerStats playername={data.home_stats} />

      </div>
    </div>
  </div>
  <div className="container_left_bottom">
    <p>{ data.league } Final</p>
  </div>
</div>
  <SbLinks />
</div>
  );
}

export default App;
