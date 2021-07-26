const express = require("express");
const app = express();
const playersResolvers = require("./playersResolvers");
const matchesResolvers = require("./matchesResolvers");

app.use(express.json()); // => req.body

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
app.post("/matches", matchesResolvers.recordMatch);

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
