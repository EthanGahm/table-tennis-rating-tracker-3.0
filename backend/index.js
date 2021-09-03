const express = require("express");
const cors = require("cors");
const app = express();
const playersResolvers = require("./playersResolvers");
const matchesResolvers = require("./matchesResolvers");

app.use(cors());
app.use(express.json()); // => req.body

app.get("/", (req, res) => {
  res.json({ Message: "Club Table Tennis at UVA | Rating Tracker API" });
});

////////////////////
// PLAYERS ROUTES //
////////////////////

// Query players based on set of filters
app.get("/players", playersResolvers.getPlayers);

// Create a player by specifying a name and initial rating.
app.post("/players", playersResolvers.createPlayer);

// Update a player with a specified set of fields
// Single route parameter to specify which player should be updated
app.put("/players/:id", playersResolvers.updatePlayer);

// Delete a player
app.delete("/players/:id", playersResolvers.deletePlayer);

////////////////////
// MATCHES ROUTES //
////////////////////

// Query matches based on set of filters
app.get("/matches", matchesResolvers.getMatches);

// Create a new entry in the matches table and update player ratings accordingly.
app.post("/matches", matchesResolvers.recordMatches);

// Update a match with a specified set of fields
// Single route parameter to specify which player should be updated
app.put("/matches/:id", matchesResolvers.updateMatch);

// Delete a match. Generally don't use this endpoint since it doesn't do anything about rating adjustments, etc.
// app.delete("/matches/:id", matchesResolvers.deleteMatch);

// Unrecord a match. Should only be used to remove a game if it's the most recent game for both players.
// Makes it as if that match was never played by reverting player ratings to what they were before the game.
app.delete("/matches/:id", matchesResolvers.unrecordMatch);

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
