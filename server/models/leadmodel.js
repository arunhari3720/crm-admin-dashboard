const mongoose = require("mongoose");

const field_schema = new mongoose.Schema(
{
    field_name: {
        type: String,
        required: true,
        trim: true
    },

    field_value: {
        type: mongoose.Schema.Types.Mixed,
        default: ""
    }
},
{
    _id: false
}
);

const lead_schema = new mongoose.Schema(
{
    lead_data: [field_schema],

    lead_data2: [field_schema],

    lead_data3: [field_schema]
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Lead", lead_schema);