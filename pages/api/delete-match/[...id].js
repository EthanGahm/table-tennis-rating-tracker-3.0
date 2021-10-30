import { pool } from '../../../lib/db';

export default async function handler(req, res) {
  try {
    // Grab the id from the path params
    const { id } = req.query;

    // Delete the match from the matches table.
    await pool.query(`DELETE FROM matches WHERE "matchId" = ${id}`);

    // Tell the requester that the deletion was successful.
    res.json({ message: 'Match deleted!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
