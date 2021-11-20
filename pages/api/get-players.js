import { pool } from '../../lib/db';

export default async function handler(req, res) {
  try {
    // Make query
    const players = await pool.query('SELECT * FROM players');

    // Send result of query back to requester.
    res.json(players.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
