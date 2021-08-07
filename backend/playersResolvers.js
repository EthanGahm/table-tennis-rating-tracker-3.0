const pool = require("./db");

// Returns a list of rows from the players table based on a set of filters
async function getPlayers(req, res) {
  try {
    // Base for query
    let query = "SELECT * FROM players";

    // Add on a new WHERE clause for each filter specified
    // If no filters are specified, the base query is made selecting all players.
    if (Object.keys(req.body).length > 0) {
      query += " WHERE";
      for (const key of Object.keys(req.body)) {
        query += ` "${key}" = '${req.body[key]}' AND`;
      }
      // Remove the trailing " AND" at the end of the query.
      query = query.slice(0, query.length - 4);
    }

    // Make query
    const players = await pool.query(query);

    // Send result of query back to requester.
    res.json(players.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}

// Creates a new player and adds their row to the players table.
// Only firstName, lastName, and rating can be specified. If rating is not specified, defaults to 100.
// Other fields are initialized to default values, many of which are null.
async function createPlayer(req, res) {
  try {
    // Get specified values from request body. If rating unspecified, set to 100.
    const { firstName, lastName, rating = 100 } = req.body;

    // Run insert query
    const newPlayer = await pool.query(
      'INSERT INTO players ("firstName", "lastName", "rating", "active", "dateOfBirth", "wins", "gamesPlayed", "ranking", "gradYear", "handedness") VALUES ($1, $2, $3, true, null, 0, 0, null, null, null) RETURNING *',
      [firstName, lastName, rating]
    );

    // Send resulting row back to requester as JSON.
    res.json(newPlayer.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}

// Updates a player's info based on a specified set of fields.
async function updatePlayer(req, res) {
  try {
    // Get player ID from route params
    const { id } = req.params;

    // String stub; will be used to store fields and their values
    let fields = "";

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
    res.json("Player info updated!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}

// Deletes a player based on a player id specified as a route param.
async function deletePlayer(req, res) {
  try {
    // Get player ID from route params
    const { id } = req.params;

    // Delete the player from the players table.
    await pool.query(`DELETE FROM players WHERE "playerId" = ${id}`);

    // Tell the requester that the deletion was successful.
    res.json("Player deleted!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}

module.exports = { getPlayers, createPlayer, updatePlayer, deletePlayer };
