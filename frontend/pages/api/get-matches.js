import { pool } from '../../lib/db';

export default async function handler(req, res) {
  try {
    // Base for query
    let query = 'SELECT * FROM matches';

    // Add on a new WHERE clause for each filter specified
    // If no filters are specified, the base query is made selecting all matches.
    if (Object.keys(req.body).length > 0) {
      query += ' WHERE';
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
