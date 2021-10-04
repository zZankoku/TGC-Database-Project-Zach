const express = require("express");
const cors = require("cors");
require("dotenv").config();
const MongoUtil = require("./config/MongoUtil");
const userRoutes = require("./controllers/user");
const postRoutes = require("./controllers/post");
const gameRoutes = require("./controllers/game");

const mongoUri = process.env.MONGO_URI;

let app = express();

// !! ENABLE JSON
app.use(express.json());

// !! ENABLE CROSS ORIGIN RESOURCES SHARING
app.use(cors());

async function main() {
  await MongoUtil.connect(mongoUri, "ggesports");

  // Set up routes
  app.use("/user", userRoutes);
  app.use("/game", gameRoutes);
  app.use("/post", postRoutes);
}

main();

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Server has started");
});
