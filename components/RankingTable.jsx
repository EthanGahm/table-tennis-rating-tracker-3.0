import React from 'react';
import { Table } from 'reactstrap';

const RankingTable = ({ headers, rows }) => (
  <Table striped>
    <thead>
      <tr>
        {headers.map(header => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map(row => (
        <tr key={row}>
          {row.map(item => (
            <td key={item}>{item}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </Table>
);

export default RankingTable;
