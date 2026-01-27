// models/Chat.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant", "system"],
    required: true
  },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const fileSchema = new mongoose.Schema({
  originalName: String,
  storedName: String,
  mimeType: String,
  size: Number,
  path: String,
  extractedText: String
});

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true
    },
    title: { type: String, default: "New Chat" },
    messages: [messageSchema],
    file: fileSchema,
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
