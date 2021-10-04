const MongoUtil = require("../config/MongoUtil");
const ObjectId = require("mongodb").ObjectId;

var game = {};

game.insertIntoGame = function (
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
  runnerUp
) {
  let db = MongoUtil.getDB();
  return db.collection("games").insertOne({
    title: title,
    location: location,
    sport: sport,
    startDate: startDate,
    endDate: endDate,
    administrator: administrator,
    description: description,
    venue: venue,
    numTeams: numTeams,
    champion: champion,
    runnerUp: runnerUp,
  });
};

game.getGame = function (gameId) {
  let db = MongoUtil.getDB();
  return db.collection("games").findOne({
    _id: ObjectId(gameId),
  });
};

game.getAllGames = function () {
  let db = MongoUtil.getDB();
  return db.collection("games").find({}).toArray();
};

game.updateGame = function (
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
  gameId
) {
  let db = MongoUtil.getDB();
  const query = { _id: ObjectId(gameId) };
  const newvalues = {
    $set: {
      title: title,
      location: location,
      sport: sport,
      startDate: startDate,
      endDate: endDate,
      administrator: administrator,
      description: description,
      venue: venue,
      numTeams: numTeams,
      champion: champion,
      runnerUp: runnerUp,
    },
  };
  return db.collection("games").updateOne(query, newvalues);
};

game.deleteGame = function (gameId) {
  let db = MongoUtil.getDB();
  const query = {
    _id: ObjectId(gameId),
  };
  return db.collection("games").deleteOne(query);
};

module.exports = game;
