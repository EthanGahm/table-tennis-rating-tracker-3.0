import { pool } from '../../lib/db';
import { calcRatingChanges } from '../../lib/eloCalc';

export default async function handler(req, res) {
  try {
    // Get match id from request params.
    const { id } = req.params;
    s;
    // Grab the winner and loser ratings from before the match.
    const matchDataQuery = await pool.query(
      `SELECT "winnerId", "loserId", "winnerRating", "loserRating" FROM matches WHERE "matchId" = ${id}`
    );
    const { winnerId, loserId, winnerRating, loserRating } = matchDataQuery.rows[0];

    // Revert the players to their pre-match ratings and update the "matchesPlayed" and "wins" values accordingly.
    await pool.query(
      `UPDATE players SET rating = ${winnerRating}, "matchesPlayed" = "matchesPlayed" - 1, wins = wins - 1 WHERE "playerId" = ${winnerId}`
    );

    await pool.query(
      `UPDATE players SET rating = ${loserRating}, "matchesPlayed" = "matchesPlayed" - 1 WHERE "playerId" = ${loserId}`
    );

    // Delete the match from the matches table.
    await pool.query(`DELETE FROM matches WHERE "matchId" = ${id}`);

    // Inform requester that match was sucessfully removed.
    res.json('Match unrecorded successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
