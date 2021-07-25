const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json()); // => req.body

// ROUTES //

// get all players
app.get("/players", async (req, res) => {
  try {
    const allPlayers = await pool.query("SELECT * FROM players");
    res.json(allPlayers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get a single player

app.get("/players/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const player = await pool.query(
      "SELECT * FROM players WHERE player_id = $1",
      [id]
    );
    res.json(player.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// create a player

app.post("/players", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      rating = 100,
      active = true,
      dateOfBirth,
      wins = 0,
      gamesPlayed = 0,
    } = req.body;
    const newPlayer = await pool.query(
      "INSERT INTO players (firstName, lastName, rating, active, dateOfBirth) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, rating, games_played, ranking]
    );
    res.json(newPlayer.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// update a plyaer

// delete a player

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
