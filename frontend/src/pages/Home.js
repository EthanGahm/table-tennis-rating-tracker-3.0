import React from "react";
import Header from "../Components/Header";
import { Paper, Typography } from "@material-ui/core";
import RankingTable from "../Components/RankingTable";
import axios from "axios";
import { backendURL } from "../config";
import useStyles from "../Styles";

const loadTableData = async () => {
  const response = await axios({
    method: "get",
    url: backendURL + "players",
    data: {
      active: true,
      orderBy: "rating DESC",
      rowLimit: 12,
    },
  });
  return response.data;
};

const Home = () => {
  const classes = useStyles();
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
      <Header pageTitle={"Home"} />
      <Paper>
        <Typography className={classes.tableHeader} variant="h4">
          Top 12 Active Players
        </Typography>
        <RankingTable data={tableData} />
      </Paper>
    </div>
  );
};

export default Home;
