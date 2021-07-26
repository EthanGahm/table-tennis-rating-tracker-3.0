const express = require("express");
const app = express();
const pool = require("./db");
const playersController = require("./playersController");

app.use(express.json()); // => req.body

////////////////////
// PLAYERS ROUTES //
////////////////////

// Query players based on set of filters
app.get("/players", playersController.getPlayers);

// Create a player by specifying a name and initial rating.
app.post("/players", playersController.createPlayer);

// Update a player with a specified set of fields
// Single route parameter to specify which player should be updated
app.put("/players/:id", playersController.updatePlayer);

// Delete a player
app.delete("/players/:id", playersController.deletePlayer);

////////////////////
// MATCHES ROUTES //
////////////////////

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
