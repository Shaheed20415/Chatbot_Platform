const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    systemPrompt: {
      type: String,
      default: ''
    },

    isDefault: {
      type: Boolean,
      default: false
    },

    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

projectSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);


// const mongoose = require('mongoose');

// const projectSchema = new mongoose.Schema(
//   {
//     userId: mongoose.Schema.Types.ObjectId,
//     name: String,
//     systemPrompt: String
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Project', projectSchema);