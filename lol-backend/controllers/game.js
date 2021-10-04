const express = require("express");
const router = express.Router();
const game = require("../models/game");
const auth = require("../utils/auth");

// Get a game
router.get("/:id", function (req, res) {
  const { id } = req.params;
  game
    .getGame(id)
    .then((result) => {
      console.log(result);
      res.status(200).json({ game: result });
    })
    .catch((err) => res.status(500).json({ err: err }));
});

// Get all games
router.get("/", function (req, res) {
  game
    .getAllGames()
    .then((result) => {
      console.log(result);
      res.status(200).json({ games: result });
    })
    .catch((err) => res.status(500).json({ err: err }));
});

// Create a game
router.post("/", auth, function (req, res) {
  const {
    title,
    location,
    sport,
    startDate,
    endDate,
    administrator,
    description,
    venue,
    numTeams,
    champion,
    runnerUp,
  } = req.body;

  game
    .insertIntoGame(
      title,
      location,
      sport,
      new Date(startDate),
      new Date(endDate),
      administrator,
      description,
      venue,
      numTeams,
      champion,
      runnerUp
    )
    .then((result) => {
      console.log(result);
      res.status(200).json({ id: result.insertedId });
    })
    .catch((err) => res.status(500).json({ err: err }));
});

// Edit a game
router.put("/:id", auth, function (req, res) {
  const {
    title,
    location,
    sport,
    startDate,
    endDate,
    administrator,
    description,
    venue,
    numTeams,
    champion,
    runnerUp,
  } = req.body;
  const { id } = req.params;

  game
    .updateGame(
      title,
      location,
      sport,
      startDate,
      endDate,
      administrator,
      description,
      venue,
      numTeams,
      champion,
      runnerUp,
      id
    )
    .then((result) => {
      console.log(result);
      res.status(200).json({ modifiedCount: result.modifiedCount });
    })
    .catch((err) => res.status(500).json({ err: err }));
});

// Delete a game
router.delete("/:id", auth, function (req, res) {
  const { id } = req.params;

  game
    .deleteGame(id)
    .then((result) => {
      console.log(result);
      res.status(200).json({ deletedCount: result.deletedCount });
    })
    .catch((err) => res.status(500).json({ err: err }));
});

module.exports = router;
