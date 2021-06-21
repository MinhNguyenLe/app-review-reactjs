const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Comment = new Schema(
  {
    idReview: {
      type: Schema.Types.ObjectId,
      ref: "Review",
      required: true,
    },
    idUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "comments" }
);

module.exports = mongoose.model("Comment", Comment);
