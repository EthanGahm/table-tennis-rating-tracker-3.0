import { useState, useEffect } from 'react';
import { server } from '../config';

import axios from 'axios';

import RankingTable from '../components/RankingTable';
import Loading from '../components/Loading';

export default function Ranking() {
  const [tableRows, setTableRows] = useState();

  useEffect(() => {
    const requestBody = {
      active: true,
      orderBy: 'rating',
      desc: true
    };
    console.log(requestBody);
    axios(
      {
        method: 'get',
        url: `${server}/api/get-players`,
        data: requestBody
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(res => {
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
