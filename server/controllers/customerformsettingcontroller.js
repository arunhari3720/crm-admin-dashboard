const CustomerFormSetting =
  require("../models/customerformsettingmodel");


// ======================================
// GET SETTINGS
// ======================================
const getsettings = async (
  req,
  res
) => {

  try {

    let settings =
      await CustomerFormSetting.findOne();

    // create default settings
    if (!settings) {

      settings =
        await CustomerFormSetting.create({
          create_active: true,
          view_active: true,
          edit_active: true,
          delete_active: false,
        });
    }

    res.status(200).json({
      success: true,
      data: settings,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ======================================
// UPDATE SETTINGS
// ======================================
const updatesettings = async (
  req,
  res
) => {

  try {

    let settings =
      await CustomerFormSetting.findOne();

    if (!settings) {

      settings =
        await CustomerFormSetting.create(
          req.body
        );

    } else {

      settings =
        await CustomerFormSetting.findByIdAndUpdate(
          settings._id,
          req.body,
          {
            new: true,
          }
        );
    }

    res.status(200).json({
      success: true,
      message:
        "Settings updated successfully",
      data: settings,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getsettings,
  updatesettings,
};