const Lead = require("../models/leadmodel");


// CREATE LEAD
const create_lead = async (req, res) => {

    try {

        const lead = await Lead.create(req.body);

        res.status(201).json({
            success: true,
            message: "Lead created successfully",
            data: lead
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// GET ALL LEADS
const get_all_leads = async (req, res) => {

    try {

        const leads = await Lead.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: leads.length,
            data: leads
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// GET SINGLE LEAD
const get_single_lead = async (req, res) => {

    try {

        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }

        res.status(200).json({
            success: true,
            data: lead
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// UPDATE LEAD
const update_lead = async (req, res) => {

    try {

        const lead = await Lead.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Lead updated successfully",
            data: lead
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// DELETE LEAD
const delete_lead = async (req, res) => {

    try {

        const lead = await Lead.findByIdAndDelete(req.params.id);

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Lead deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// GET DYNAMIC GROUP DATA
const get_group_data = async (req, res) => {

    try {

        const key = req.params.group_name;

        const leads = await Lead.find();

        let result = [];

        leads.forEach((lead) => {

            if (lead[key]) {

                result.push(...lead[key]);

            }

        });

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


module.exports = {
    create_lead,
    get_all_leads,
    get_single_lead,
    update_lead,
    delete_lead,
    get_group_data
};