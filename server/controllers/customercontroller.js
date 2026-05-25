const Customer = require("../models/customermodel");

const createcustomer = async (req, res) => {
  try {
    const { totalprice, discount } = req.body;

    if (discount > 100) {
      return res.json({ success: false, message: "discount cannot exceed 100%" });
    }

    const finalprice =
      totalprice - (discount / 100) * totalprice;

    const data = await Customer.create({
      ...req.body,
      finalprice
    });

    res.json({ success: true, data });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
const getcustomers = async (req, res) => {
  const data = await Customer.find().sort({ createdAt: -1 });
  res.json({ success: true, data });
};

const updatecustomer = async (req, res) => {
  const { id } = req.params;
  const { totalprice, discount } = req.body;

  const finalprice = totalprice - discount;

  const data = await Customer.findByIdAndUpdate(
    id,
    { ...req.body, finalprice },
    { new: true }
  );

  res.json({ success: true, data });
};

const deletecustomer = async (req, res) => {
  const { id } = req.params;
  await Customer.findByIdAndDelete(id);
  res.json({ success: true });
};

module.exports = {
  createcustomer,
  getcustomers,
  updatecustomer,
  deletecustomer
};