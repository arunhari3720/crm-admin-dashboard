const multer = require("multer");

const { CloudinaryStorage } = require(
  "multer-storage-cloudinary"
);

const cloudinary = require(
  "../config/cloudinary"
);

const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "crm-files",

    resource_type: "auto",

    type: "upload",

    access_mode: "public",

    format: undefined,

    public_id: `${Date.now()}-${
      file.originalname
    }`,
  }),
});

const upload = multer({
  storage,

  limits: {
    fileSize: 2 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedtypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",

      "application/pdf",

      "application/msword",

      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

      "application/vnd.ms-excel",

      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

      "application/vnd.ms-powerpoint",

      "application/vnd.openxmlformats-officedocument.presentationml.presentation",

      "text/plain",

      "application/zip",

      "video/mp4",

      "audio/mpeg",
    ];

    if (
      allowedtypes.includes(file.mimetype)
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Unsupported file type"
        ),
        false
      );
    }
  },
});

module.exports = upload;