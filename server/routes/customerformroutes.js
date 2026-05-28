const express = require("express");

const router = express.Router();

const {
  createform,
  getforms,
  getformbyid,
  updateform,
  deleteform,
} = require("../controllers/customerformcontroller");

const auth = require("../middleware/auth");

router.post(
  "/create",
  auth,
  createform
);

router.get(
  "/list",
  auth,
 
  getforms
);

router.get(
  "/:id",
  auth,

  getformbyid
);

router.put(
  "/update/:id",
  auth,
  
  updateform
);

router.delete(
  "/delete/:id",
  auth,
  
  deleteform
);

module.exports = router;