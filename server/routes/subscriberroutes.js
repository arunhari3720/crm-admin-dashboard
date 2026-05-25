const express = require("express");
const router = express.Router();

const { subscribe } = require("../controllers/subscribercontroller");

router.post("/subscribe", subscribe);

module.exports = router;