import React from 'react';

import Content from '../components/Content';

import RankingTable from '../components/RankingTable';

export default function Ranking() {
  return (
    <>
      <h3>Ranking</h3>
      <RankingTable headers={['header1', 'header2', 'header3']} rows={[['item1', 'item2', 'item3']]} />
    </>
  );
}
