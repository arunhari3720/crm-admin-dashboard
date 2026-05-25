const Field = require("../models/fieldmodel");

function CreateField(req, res) {
  try {
    console.log("Incoming Data 👉", req.body);

    const {
      fieldname,
      label,
      datatype,
      required = false,
      options = [],
      config = {},
    } = req.body;

    // 🔥 validation
    if (!fieldname || !label) {
      return res.status(400).json({
        message: "Fieldname and Label required",
      });
    }

    const field = new Field({
      fieldname,
      label,
      datatype,
      required,
      options,
      config,
    });

    field.save();

    res.json({ message: "Field Created", field });

  } catch (err) {
    console.error("Backend Error:", err);
    res.status(500).json({ error: err.message });
  }
}

function GetFields(req, res) {
  Field.find().then((data) => res.json(data));
}

module.exports = {
  CreateField,
  GetFields,
};