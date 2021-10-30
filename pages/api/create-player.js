import { pool } from '../../lib/db';

export default async function handler(req, res) {
  try {
    // Get specified values from request body. If rating unspecified, set to 100.
    const { firstName, lastName, rating = 100 } = req.body;

    // Run insert query
    const newPlayer = await pool.query(
      'INSERT INTO players ("firstName", "lastName", "rating", "active", "dateOfBirth", "wins", "matchesPlayed", "ranking", "gradYear", "handedness") VALUES ($1, $2, $3, true, null, 0, 0, null, null, null) RETURNING *',
      [firstName, lastName, rating]
    );

    // Send resulting row back to requester as JSON.
    res.json(newPlayer.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
