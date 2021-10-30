import { pool } from '../../../lib/db';

export default async function handler(req, res) {
  try {
    // Grab the id from the path params
    const { id } = req.query;

    // String stub; will be used to store fields and their values
    let fields = '';

    // If at least one field has been included in the body of the request,
    // update those field(s).
    if (Object.keys(req.body).length > 0) {
      for (const key of Object.keys(req.body)) {
        fields += `"${key}" = '${req.body[key]}', `;
      }
      // Remove the trailing ", " at the end of the fields string.
      fields = fields.slice(0, fields.length - 2);
    }

    // Complete query string
    let query = `UPDATE players SET ${fields} WHERE "playerId" = ${id}`;

    // Update the player in the database.
    await pool.query(query);

    // Tell the requester that the update was successful.
    res.json({ message: 'Player info updated!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
