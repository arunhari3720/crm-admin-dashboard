const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const checkcustomerformpermission = require(
  "../middleware/checkcustomerformpermission"
);

const {
  createform,
  getforms,
  getformbyid,
  updateform,
  deleteform,
} = require(
  "../controllers/customerformcontroller"
);

router.post(
  "/create",
  auth,
  checkcustomerformpermission("create"),
  createform
);

router.get(
  "/list",
  auth,
  checkcustomerformpermission("view"),
  getforms
);

router.get(
  "/:id",
  auth,
  checkcustomerformpermission("view"),
  getformbyid
);

router.put(
  "/update/:id",
  auth,
  checkcustomerformpermission("edit"),
  updateform
);

router.delete(
  "/delete/:id",
  auth,
  checkcustomerformpermission("delete"),
  deleteform
);

module.exports = router;