const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { DateTime } = require("luxon");

const MessageSchema = new Schema(
  {
    title: { type: String, required: true, maxLength: 300 },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

MessageSchema.virtual("url").get(function () {
  return `/message/${this._id}`;
});

MessageSchema.virtual("date").get(function () {
  return `/message/${this._id}`;
});

module.exports = mongoose.model("Message", MessageSchema);
