const mongoose = require("mongoose");
// 1- Create Schema
const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Sender must be belong to user"],
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Sender must be belong to user"],
    },
    content: {
      type: String,
      required: [true, "Content message is required"],
    },
    seen: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// 3- Populate models
messageSchema.pre(/^find/, function (next) {
  this.populate({
    path: "sender",
  });
  this.populate({
    path: "receiver",
  });

  next();
});

// 3- Create model
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
