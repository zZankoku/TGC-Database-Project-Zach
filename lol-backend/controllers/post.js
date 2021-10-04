const express = require("express");
const router = express.Router();
const post = require("../models/post");
const auth = require("../utils/auth");

// Get a post
router.get("/:id", function (req, res) {
  const { id } = req.params;
  post
    .getPost(id)
    .then((result) => {
      console.log(result);
      res.status(200).json({ post: result });
    })
    .catch((err) => res.status(500).json({ err: err }));
});

// Get posts for a game
router.get("/game/:gameid", function (req, res) {
  const { gameid } = req.params;
  post
    .getPostsForGame(gameid)
    .then((result) => {
      console.log(result);
      res.status(200).json({ posts: result });
    })
    .catch((err) => res.status(500).json({ err: err }));
});

// Create a post for a game
router.post("/game/:gameid", auth, function (req, res) {
  const { postAuthor, postContent, postTitle } = req.body;
  const { gameid } = req.params;

  post
    .insertIntoPost(postAuthor, new Date(), postContent, postTitle, gameid)
    .then((result) => {
      console.log(result);
      res.status(200).json({ id: result.insertedId });
    })
    .catch((err) => res.status(500).json({ err: err }));
});

// Edit a post
router.put("/:id", auth, function (req, res) {
  const { postContent, postTitle } = req.body;
  const { id } = req.params;

  post
    .updatePost(postContent, postTitle, id)
    .then((result) => {
      console.log(result);
      res.status(200).json({ modifiedCount: result.modifiedCount });
    })
    .catch((err) => res.status(500).json({ err: err }));
});

// Delete a post
router.delete("/:id", auth, function (req, res) {
  const { id } = req.params;

  post
    .deletePost(id)
    .then((result) => {
      console.log(result);
      res.status(200).json({ deletedCount: result.deletedCount });
    })
    .catch((err) => res.status(500).json({ err: err }));
});

module.exports = router;
