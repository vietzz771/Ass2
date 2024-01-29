const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const leaderRouter = express.Router();
const Leaders = require("../models/leaders");

leaderRouter.use(bodyParser.json());

// Endpoint: /leaders
leaderRouter
  .route("/")
  .get((req, res, next) => {
    Leaders.find({})
      .then((leaders) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(leaders);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Leaders.create(req.body)
      .then((leader) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /leaders");
  })
  .delete((req, res, next) => {
    Leaders.deleteMany({})
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
      })
      .catch((err) => next(err));
  });

// Endpoint: /leaders/:leaderId
leaderRouter
  .route("/:leaderId")
  .get((req, res, next) => {
    Leaders.findById(req.params.leaderId)
      .then((leader) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /leaders/" + req.params.leaderId);
  })
  .put((req, res, next) => {
    Leaders.findByIdAndUpdate(
      req.params.leaderId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((leader) => {
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json");
        res.json(leader);
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Leaders.findByIdAndDelete(req.params.leaderId)
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
      })
      .catch((err) => next(err));
  });

module.exports = leaderRouter;
