import { pool } from '../../lib/db';

export default async function handler(req, res) {
  try {
    // Make query
    const matches = await pool.query('SELECT * FROM matches');

    // Send result of query back to requester.
    res.json(matches.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
