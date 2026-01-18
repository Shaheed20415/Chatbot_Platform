const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },

    projectId: mongoose.Schema.Types.ObjectId,

    chatId: mongoose.Schema.Types.ObjectId,

    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: true
    },

    content: {
      type: String,
      default: ''
    },

    fileId: mongoose.Schema.Types.ObjectId
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);


// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema(
//   {
//     projectId: mongoose.Schema.Types.ObjectId,
//     role: String,
//     content: String
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Message', messageSchema);