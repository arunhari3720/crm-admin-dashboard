const mongoose = require("mongoose");

const customerformsettingSchema =
  new mongoose.Schema(
    {
      edit_active: {
        type: Boolean,
        default: true,
      },

      delete_active: {
        type: Boolean,
        default: false,
      },

      view_active: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.models.customerformsetting ||
  mongoose.model(
    "customerformsetting",
    customerformsettingSchema
  );