// Given an initial rating for the winner and loser of a match, as well
// as the number of games won by each player, returns an array of the
// rating adjustments for each player.
function calcRatingChanges(winnerRating, loserRating, winnerWins, loserWins) {
  let winnerRatingChange = 0;
  let loserRatingChange = 0;

  let winnerWinProb =
    1.0 / (1.0 + Math.pow(10.0, (winnerRating - loserRating) / 100.0));
  let loserWinProb = 1.0 - winnerWinProb;

  for (let i = 0; i < winnerWins; i++) {
    winnerRatingChange += 4 * winnerWinProb;
    loserRatingChange -= 4 * winnerWinProb;
  }

  for (let i = 0; i < loserWins; i++) {
    winnerRatingChange -= 4 * loserWinProb;
    loserRatingChange += 4 * loserWinProb;
  }

  return [winnerRatingChange, loserRatingChange];
}

module.exports = { calcRatingChanges };
