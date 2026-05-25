const express = require("express");
const router = express.Router();

const {
  create_project,
  get_projects,
  get_project_by_id,
  update_project,
  delete_project
} = require("../controllers/project_controller");


// CRUD Routes
router.post("/", create_project);
router.get("/", get_projects);
router.get("/:id", get_project_by_id);
router.put("/:id", update_project);
router.delete("/:id", delete_project);

module.exports = router;