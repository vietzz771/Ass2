const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Youtube = require("../models/youtubes");
const youtubeRouter = express.Router();

youtubeRouter.use(bodyParser.json());

youtubeRouter
  .route("/")
  .get((req, res, next) => {
    Youtube.find({})
      .then(
        (videos) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(videos);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Youtube.create(req.body)
      .then(
        (video) => {
          console.log("Video created", video);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(video);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /youtube");
  })
  .delete((req, res, next) => {
    Youtube.deleteMany({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

youtubeRouter
  .route("/:videoId")
  .get((req, res, next) => {
    Youtube.findById(req.params.videoId)
      .then(
        (video) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(video);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /youtube/" + req.params.videoId);
  })
  .put((req, res, next) => {
    Youtube.findByIdAndUpdate(
      req.params.videoId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (video) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(video);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Youtube.findByIdAndDelete(req.params.videoId).then(
      (resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
      },
      (err) => next(err)
    );
  });

// Thêm các endpoint cho comments tương tự như trong dishRouter nếu cần

module.exports = youtubeRouter;
