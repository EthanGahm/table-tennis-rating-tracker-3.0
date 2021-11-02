import { useState, useEffect } from 'react';

import axios from 'axios';

import RankingTable from '../components/RankingTable';
import Loading from '../components/Loading';

export default function Ranking() {
  const [tableRows, setTableRows] = useState();

  useEffect(() => {
    axios({
      method: 'get',
      url: '/api/get-players',
      data: {
        active: true,
        orderBy: 'rating',
        desc: true
      }
    }).then(res => {
      let rows = [];
      for (const [index, player] of res.data.entries()) {
        rows.push([index + 1, player.firstName + ' ' + player.lastName, player.rating]);
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
