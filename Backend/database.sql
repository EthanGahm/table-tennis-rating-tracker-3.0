CREATE DATABASE table_tennis_db;

-- \c into table_tennis_db

CREATE TABLE players (
  player_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  rating INT,
  games_played INT,
  ranking INT
);