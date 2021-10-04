const MongoUtil = require("../config/MongoUtil");
const ObjectId = require("mongodb").ObjectId;

var post = {};

post.insertIntoPost = function (
  postAuthor,
  createdDate,
  postContent,
  postTitle,
  gameId
) {
  let db = MongoUtil.getDB();
  return db.collection("posts").insertOne({
    postAuthor: postAuthor,
    createdDate: createdDate,
    postContent: postContent,
    postTitle: postTitle,
    gameId: ObjectId(gameId),
  });
};

post.getPost = function (postId) {
  let db = MongoUtil.getDB();
  return db.collection("posts").findOne({
    _id: ObjectId(postId),
  });
};

post.getPostsForGame = function (gameId) {
  let db = MongoUtil.getDB();
  return db
    .collection("posts")
    .find({
      gameId: ObjectId(gameId),
    })
    .toArray();
};

post.updatePost = function (postContent, postTitle, postId) {
  let db = MongoUtil.getDB();
  const query = { _id: ObjectId(postId) };
  const newvalues = {
    $set: {
      postContent: postContent,
      postTitle: postTitle,
    },
  };
  return db.collection("posts").updateOne(query, newvalues);
};

post.deletePost = function (postId) {
  let db = MongoUtil.getDB();
  const query = {
    _id: ObjectId(postId),
  };
  return db.collection("posts").deleteOne(query);
};

module.exports = post;
