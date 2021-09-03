import React from "react";
import useStyles from "../Styles";
import {
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@material-ui/core";

export default function RankingTable({ data }) {
  const classes = useStyles();

  console.log("Data: " + data);
  return (
    <div>
      {data ? (
        <Box m={2} component={Paper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Rank</TableCell>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">Recorded Matches</TableCell>
                <TableCell align="center">Win %</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.name}>
                  {row.map((cell) => (
                    <TableCell align="center">{cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}
