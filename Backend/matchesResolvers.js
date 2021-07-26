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

async function recordMatch(req, res) {
  try {
    // All of these values must be specified every time.
    const { date, winnerId, loserId, bestOf, winnerScore, loserScore } =
      req.body;

    // Get ratings for winner and loser from the players table.
    const winnerRatingQuery = await pool.query(
      `SELECT rating FROM players WHERE "playerId" = ${winnerId}`
    );
    const winnerRating = winnerRatingQuery.rows[0].rating;
    const loserRatingQuery = await pool.query(
      `SELECT rating FROM players WHERE "playerId" = ${loserId}`
    );
    const loserRating = loserRatingQuery.rows[0].rating;

    console.log(winnerRating);

    // Find rating adjustment values.
    const [winnerRatingChange, loserRatingChange] = calcRatingChanges(
      winnerRating,
      loserRating,
      winnerScore,
      loserScore
    );
    console.log(typeof date);

    // Insert new match row into matches table.
    const insertQueryString = `INSERT INTO matches (
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
      to_timestamp(${date.toString()}, 'YYYY-MM-DD'),
      ${winnerId},
      ${loserId},
      ${winnerRating},
      ${loserRating},
      ${bestOf},
      ${winnerScore},
      ${loserScore},
      ${winnerRatingChange},
      ${loserRatingChange}
    ) RETURNING *`;
    const newMatch = await pool.query(insertQueryString);

    // Apply rating adjustment values and update players table accordingly.
    const newWinnerRating = winnerRating + winnerRatingChange;
    const newLoserRating = loserRating + loserRatingChange;
    await pool.query(
      `UPDATE players SET rating = ${newWinnerRating} WHERE "playerId" = ${winnerId}`
    );
    await pool.query(
      `UPDATE players SET rating = ${newLoserRating} WHERE "playerId" = ${loserId}`
    );

    // Inform requester that match has been successfully recorded.
    res.json(newMatch.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}

module.exports = { getMatches, recordMatch };
