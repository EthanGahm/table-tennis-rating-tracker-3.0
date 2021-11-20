import { useState, useEffect } from 'react';
import { server } from '../config';

import axios from 'axios';

import RankingTable from '../components/RankingTable';
import Loading from '../components/Loading';

export default function Ranking() {
  const [tableRows, setTableRows] = useState();

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/get-players'
    }).then(res => {
      let rows = [];
      let players = res.data;
      players.sort((a, b) => a.rating > b.rating);
      let index = 0;
      for (const player of players) {
        rows.push([++index, player.firstName + ' ' + player.lastName, Math.round(player.rating, 4)]);
      }
      setTableRows(rows);
    });
  }, []);

  return (
    <>
      <h3>Ranking</h3>
      {tableRows ? <RankingTable headers={['Rank', 'Name', 'Rating']} rows={tableRows} /> : <Loading />}
    </>
  );
}
