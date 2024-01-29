const express = require("express"),
  http = require("http");
const mongoose = require("mongoose");
const Dishes = require("./src/models/dishes");
const dishRouter = require("./src/routes/dishRouter");
const leaderRouter = require("./src/routes/leaderRouter");
const promoRouter = require("./src/routes/promoRouter");
const youtubeRouter = require("./src/routes/youtubeRouter");
const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);

const hostname = "localhost";
const port = 3000;

const app = express();
app.use("/youtubes", youtubeRouter);
app.use("/dishes", dishRouter);
app.use("/leaders", leaderRouter);
app.use("/promotions", promoRouter);

const server = http.createServer(app);

server.listen(port, hostname, () => {});
console.log(`Server running at http://${hostname}:${port}/`);

connect.then(
  (db) => {
    console.log("Connected correctly to server");
  },
  (err) => console.log(err)
);
