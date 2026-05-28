const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },

    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
      },
    ],

    formpermissions: {
      create: {
        type: Boolean,
        default: false,
      },

      view: {
        type: Boolean,
        default: false,
      },

      edit: {
        type: Boolean,
        default: false,
      },

      delete: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Permission ||
  mongoose.model("Permission", permissionSchema);