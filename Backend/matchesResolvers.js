const pool = require("./db");
const { calcRatingChanges } = require("./eloCalc");

// Returns a list of rows from the players table based on a set of filters
async function getMatches(req, res) {
  try {
    // Base for query
    let query = "SELECT * FROM matches";

    // Add on a new WHERE clause for each filter specified
    // If no filters are specified, the base query is made selecting all matches.
    if (Object.keys(req.body).length > 0) {
      query += " WHERE";
      for (const key of Object.keys(req.body)) {
        query += ` "${key}" = '${req.body[key]}' AND`;
      }
      // Remove the trailing " AND" at the end of the query.
      query = query.slice(0, query.length - 4);
    }

    // Make query
    const matches = await pool.query(query);

    // Send result of query back to requester.
    res.json(matches.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}

async function recordMatches(req, res) {
  try {
    // This array will be returned to the requester at the end of the function call to tell them exactly which
    // matches were inserted into the database and in what order.
    let matchesInserted = [];

    // Iterate through each match that's been submitted.
    for (const match of req.body) {
      // All of these values must be specified every time.
      let { date, winnerId, loserId, bestOf, winnerScore, loserScore } = match;

      // Get ratings for winner and loser from the players table.
      let winnerRatingQuery = await pool.query(
        `SELECT rating FROM players WHERE "playerId" = ${winnerId}`
      );
      let winnerRating = winnerRatingQuery.rows[0].rating;
      let loserRatingQuery = await pool.query(
        `SELECT rating FROM players WHERE "playerId" = ${loserId}`
      );
      let loserRating = loserRatingQuery.rows[0].rating;

      // Find rating adjustment values.
      let [winnerRatingChange, loserRatingChange] = calcRatingChanges(
        winnerRating,
        loserRating,
        winnerScore,
        loserScore
      );

      // Insert new match row into matches table.
      let insertQueryString = `INSERT INTO matches (
      "date", 
      "winnerId", 
      "loserId", 
      "winnerRating", 
      "loserRating", 
      "bestOf", 
      "winnerScore", 
      "loserScore", 
      "winnerRatingChange", 
      "loserRatingChange"
    ) 
    VALUES (
      to_date('${date}', 'YYYY-MM-DD'),
      ${winnerId},
      ${loserId},
      ${winnerRating},
      ${loserRating},
      ${bestOf},
      ${winnerScore},
      ${loserScore},
      ${parseFloat(winnerRatingChange)},
      ${parseFloat(loserRatingChange)}
    ) RETURNING *`;
      let newMatch = await pool.query(insertQueryString);

      // Apply rating adjustment values and update players table accordingly.
      // Increment the number of games played for each player and increment the number of wins for the winner.
      let newWinnerRating = parseFloat(winnerRating) + winnerRatingChange;
      let newLoserRating = parseFloat(loserRating) + loserRatingChange;
      await pool.query(
        `UPDATE players SET rating = ${newWinnerRating}, "gamesPlayed" = "gamesPlayed" + 1, wins = wins + 1 WHERE "playerId" = ${winnerId}`
      );
      await pool.query(
        `UPDATE players SET rating = ${newLoserRating}, "gamesPlayed" = "gamesPlayed" + 1 WHERE "playerId" = ${loserId}`
      );

      // Insert the new match into the list of all inserted matches.
      matchesInserted.push(newMatch.rows);
    }
    // Inform requester that matches were sucessfully recorded and give the matches' data as a JSON.
    res.json(matchesInserted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}

module.exports = { getMatches, recordMatches };
