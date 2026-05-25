const XLSX = require("xlsx");
const Excel = require("../models/exceldata");

const uploadexcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(sheet);

    if (!data.length) {
      return res.status(400).json({ message: "Empty Excel file" });
    }

    const savedData = await Excel.create({
      filename: req.file.originalname, // ✅ store file name
      data,
    });

    res.status(200).json({
      message: "File uploaded successfully",
      data: savedData,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const getexceldata = async (req, res) => {
  try {
    const data = await Excel.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    console.error("FETCH ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadexcel, getexceldata };