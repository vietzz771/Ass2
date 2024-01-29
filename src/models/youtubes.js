const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

// Đối tượng lồng nhau
const idSchema = new Schema({
  kind: String,
  channelId: String,
  videoId: String,
});

const itemSchema = new Schema({
  kind: String,
  etag: String,
  id: idSchema,
});

const pageInfoSchema = new Schema({
  totalResults: Number,
  resultsPerPage: Number,
});

// Schema chính
const youtubeSchema = new Schema({
  kind: String,
  etag: String,
  nextPageToken: String,
  regionCode: String,
  pageInfo: pageInfoSchema,
  items: [itemSchema],
});

var Youtubes = mongoose.model("Youtube", youtubeSchema);
module.exports = Youtubes;
