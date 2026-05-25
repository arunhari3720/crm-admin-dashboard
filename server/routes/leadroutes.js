const express = require("express");

const router = express.Router();

const {
    create_lead,
    get_all_leads,
    get_single_lead,
    update_lead,
    delete_lead,
    get_group_data
} = require("../controllers/leadcontroller");


// CREATE LEAD
router.post("/", create_lead);


// GET ALL LEADS
router.get("/", get_all_leads);


// GET DYNAMIC GROUP DATA
router.get("/group/:group_name", get_group_data);


// GET SINGLE LEAD
router.get("/:id", get_single_lead);


// UPDATE LEAD
router.put("/:id", update_lead);


// DELETE LEAD
router.delete("/:id", delete_lead);


module.exports = router;