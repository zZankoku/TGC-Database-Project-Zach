const MongoUtil = require("../config/MongoUtil");

var user = {};

user.insertIntoUser = function (fullName, username, email, password) {
  let db = MongoUtil.getDB();
  return db.collection("users").insertOne({
    fullName: fullName,
    username: username,
    email: email,
    password: password,
  });
};

user.getUser = function (username) {
  let db = MongoUtil.getDB();
  return db.collection("users").findOne({
    username: username,
  });
};

user.getAllUser = function () {
  let db = MongoUtil.getDB();
  return db.collection("users").find({}).toArray();
};

user.getUserWithUsernamePassword = function (username, password) {
  let db = MongoUtil.getDB();
  return db.collection("users").findOne({
    username: username,
    password: password,
  });
};

user.updateUser = function (fullName, email, password, username) {
  let db = MongoUtil.getDB();
  const query = { username: username };
  const newvalues = {
    $set: {
      fullName: fullName,
      email: email,
      password: password,
    },
  };
  return db.collection("users").updateOne(query, newvalues);
};

user.deleteUser = function (username) {
  let db = MongoUtil.getDB();
  const query = {
    username: username,
  };
  return db.collection("users").deleteOne(query);
};

module.exports = user;
