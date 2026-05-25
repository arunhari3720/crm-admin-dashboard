const Event = require("../models/eventmodel");

/* ---------------- CREATE ---------------- */
exports.createevent = async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.json({
      success: true,
      message: "Event created",
      data: event
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ---------------- GET ---------------- */
exports.getevents = async (req, res) => {
  try {
    const events = await Event.find().sort({ datetime: 1 });

    res.json({
      success: true,
      data: events
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ---------------- UPDATE ---------------- */
exports.updateevent = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Event.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.json({
      success: true,
      message: "Event updated",
      data: updated
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/* ---------------- DELETE ---------------- */
exports.deleteevent = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Event.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.json({
      success: true,
      message: "Event deleted"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};