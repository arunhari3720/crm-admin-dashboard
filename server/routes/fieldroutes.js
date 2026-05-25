const express = require("express");
const router = express.Router();

const Field = require("../models/fieldmodel");

// ================= CREATE =================
router.post("/", async (req, res) => {
  try {
    const field = new Field(req.body);
    await field.save();
    res.json(field);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= GET ALL =================
router.get("/", async (req, res) => {
  const data = await Field.find();
  res.json(data);
});

// ================= UPDATE =================
router.put("/:id", async (req, res) => {
  try {
    const updated = await Field.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= DELETE =================
router.delete("/:id", async (req, res) => {
  try {
    await Field.findByIdAndDelete(req.params.id);
    res.json({ message: "Field deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;