const Subscriber = require("../models/subscribermodel");

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "already subscribed" });
    }

    const subscriber = await Subscriber.create({ email });

    res.status(201).json({
      message: "subscribed successfully",
      data: subscriber,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { subscribe };