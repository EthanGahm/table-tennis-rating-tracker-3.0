import { pool } from '../../lib/db';

export default async function handler(req, res) {
  try {
    // Get match ID from route params
    const { id } = req.params;

    // Delete the match from the matches table.
    await pool.query(`DELETE FROM matches WHERE "matchId" = ${id}`);

    // Tell the requester that the deletion was successful.
    res.json('Match deleted!');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
