const File = require(
  "../models/filemodel"
);

const Notification = require(
  "../models/notification_model"
);

const cloudinary = require(
  "../config/cloudinary"
);

// ======================================================
// 🔥 UPLOAD FILE
// ======================================================

const uploadfile = async (
  req,
  res
) => {
  try {

    // ======================================================
    // VALIDATE FILE
    // ======================================================

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // ======================================================
    // DETECT RESOURCE TYPE
    // ======================================================

    let resourcetype = "raw";

    if (
      req.file.mimetype.startsWith(
        "image"
      )
    ) {
      resourcetype = "image";
    }

    if (
      req.file.mimetype.startsWith(
        "video"
      )
    ) {
      resourcetype = "video";
    }

    // ======================================================
    // SAVE FILE
    // ======================================================

    const savedfile =
      await File.create({

        filename:
          req.file.originalname,

        fileurl:
          req.file.path,

        publicid:
          req.file.filename,

        resourcetype,

        mimetype:
          req.file.mimetype,

        filesize:
          req.file.size,
      });

    // ======================================================
    // CREATE NOTIFICATION
    // ======================================================

    try {

      console.log(
        "UPLOAD USER:",
        req.user
      );

      await Notification.create({

        user_id:
          req.user?._id ||
          req.user?.id ||
          req.user?.userid,

        type: "system",

        title:
          "File Upload Completed",

        message:
          `${req.file.originalname} uploaded successfully`,

        reference_id:
          savedfile._id,
      });
console.log(
        "File Upload Notification Created"
);
    } catch (notificationerror) {

      console.log(
        "Upload Notification Error:",
        notificationerror.message
      );
    }

    // ======================================================
    // RESPONSE
    // ======================================================

    res.status(201).json({
      success: true,

      message:
        "File uploaded successfully",

      file: savedfile,
    });

  } catch (error) {

    console.log(
      "UPLOAD ERROR:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        error.message,
    });
  }
};

// ======================================================
// 🔥 GET FILES
// ======================================================

const getfiles = async (
  req,
  res
) => {
  try {

    const files =
      await File.find().sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      files,
    });

  } catch (error) {

    console.log(
      "GET FILES ERROR:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        error.message,
    });
  }
};

// ======================================================
// 🔥 UPDATE FILE
// ======================================================

const updatefile = async (
  req,
  res
) => {
  try {

    const existingfile =
      await File.findById(
        req.params.id
      );

    // ======================================================
    // FILE NOT FOUND
    // ======================================================

    if (!existingfile) {

      return res.status(404).json({
        success: false,

        message:
          "File not found",
      });
    }

    // ======================================================
    // FILE REQUIRED
    // ======================================================

    if (!req.file) {

      return res.status(400).json({
        success: false,

        message:
          "No new file uploaded",
      });
    }

    // ======================================================
    // DELETE OLD CLOUDINARY FILE
    // ======================================================

    try {

      await cloudinary.uploader.destroy(
        existingfile.publicid,
        {
          resource_type:
            existingfile.resourcetype,
        }
      );

    } catch (cloudinaryerror) {

      console.log(
        "Cloudinary Delete Error:",
        cloudinaryerror.message
      );
    }

    // ======================================================
    // DETECT RESOURCE TYPE
    // ======================================================

    let resourcetype = "raw";

    if (
      req.file.mimetype.startsWith(
        "image"
      )
    ) {
      resourcetype = "image";
    }

    if (
      req.file.mimetype.startsWith(
        "video"
      )
    ) {
      resourcetype = "video";
    }

    // ======================================================
    // UPDATE FILE
    // ======================================================

    const updatedfile =
      await File.findByIdAndUpdate(
        req.params.id,
        {

          filename:
            req.file.originalname,

          fileurl:
            req.file.path,

          publicid:
            req.file.filename,

          resourcetype,

          mimetype:
            req.file.mimetype,

          filesize:
            req.file.size,
        },
        {
          new: true,
        }
      );

    // ======================================================
    // RESPONSE
    // ======================================================

    res.status(200).json({
      success: true,

      message:
        "File updated successfully",

      file: updatedfile,
    });

  } catch (error) {

    console.log(
      "UPDATE ERROR:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        error.message,
    });
  }
};

// ======================================================
// 🔥 DELETE FILE
// ======================================================

const deletefile = async (
  req,
  res
) => {
  try {

    // ======================================================
    // FIND FILE
    // ======================================================

    const file =
      await File.findById(
        req.params.id
      );

    if (!file) {

      return res.status(404).json({
        success: false,

        message:
          "File not found",
      });
    }

    // ======================================================
    // DELETE CLOUDINARY FILE
    // ======================================================

    try {

      await cloudinary.uploader.destroy(
        file.publicid,
        {
          resource_type:
            file.resourcetype,
        }
      );

    } catch (cloudinaryerror) {

      console.log(
        "Cloudinary Delete Error:",
        cloudinaryerror.message
      );
    }

    // ======================================================
    // CREATE NOTIFICATION
    // ======================================================

    try {

      //console.log( "DELETE USER:", req.user );

      await Notification.create({

        user_id:
          req.user?._id ||
          req.user?.id ||
          req.user?.userid,

        type: "alert",

        title:
          "File Deleted",

        message:
          `${file.filename} deleted successfully`,

        reference_id:
          file._id,
      });

    } catch (notificationerror) {

      console.log(
        "Delete Notification Error:",
        notificationerror.message
      );
    }

    // ======================================================
    // DELETE FILE FROM DB
    // ======================================================

    await File.findByIdAndDelete(
      req.params.id
    );

    // ======================================================
    // RESPONSE
    // ======================================================

    res.status(200).json({
      success: true,

      message:
        "File deleted successfully",
    });

  } catch (error) {

    console.log(
      "DELETE ERROR:",
      error
    );

    res.status(500).json({
      success: false,

      message:
        error.message,
    });
  }
};

module.exports = {
  uploadfile,
  getfiles,
  updatefile,
  deletefile,
};