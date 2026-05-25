const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    role: {
      type: String, // matches JWT role
      required: true,
    },
    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Permission", permissionSchema);