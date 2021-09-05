import React from "react";
import Header from "../Components/Header";
import RankingTable from "../Components/RankingTable";
import axios from "axios";
import { backendURL } from "../config";

const loadTableData = async () => {
  const response = await axios({
    method: "get",
    url: backendURL + "players",
    data: {
      active: true,
      orderBy: "rating DESC",
    },
  });
  return response.data;
};

const Rankings = () => {
  const [tableData, setTableData] = React.useState(false);

  React.useEffect(() => {
    loadTableData().then((data) => {
      let rows = [];
      let rank = 0;
      for (const row of data) {
        rank++;
        rows.push([
          rank,
          row.firstName,
          row.lastName,
          row.rating,
          row.matchesPlayed,
          (row.wins / row.matchesPlayed) * 100,
        ]);
      }
      setTableData(rows);
    });
  }, []);

  return (
    <div>
      <Header pageTitle={"Rankings"} />
      <RankingTable data={tableData} />
    </div>
  );
};

export default Rankings;
