const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, maxLength: 300 },
  content: { type: String, required: true },
  timestamps: true,
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

MessageSchema.virtual("url").get(function () {
  return `/message/${this._id}`;
});

module.exports = mongoose.model("Message", MessageSchema);
