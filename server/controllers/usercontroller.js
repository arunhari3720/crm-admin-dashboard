const User = require(
  "../models/user_model"
);

const crypto = require(
  "crypto"
);


// =============================================
// SECRET KEY
// =============================================

const secretkey =
  crypto
    .createHash("sha256")
    .update(
      "my_super_secret_key"
    )
    .digest();


// =============================================
// DECRYPT PASSWORD
// =============================================

const decryptpassword = (
  encryptedpassword
) => {

  try {

    const parts =
      encryptedpassword.split(
        ":"
      );

    const iv =
      Buffer.from(
        parts[0],
        "hex"
      );

    const encryptedtext =
      parts[1];

    const decipher =
      crypto.createDecipheriv(
        "aes-256-cbc",
        secretkey,
        iv
      );

    let decrypted =
      decipher.update(
        encryptedtext,
        "hex",
        "utf8"
      );

    decrypted +=
      decipher.final(
        "utf8"
      );

    return decrypted;

  } catch {

    return "Invalid Password";
  }
};


// =============================================
// GET USERS
// =============================================

exports.get_users =
  async (req, res) => {

    try {

      const users =
        await User.find()
          .sort({
            createdAt: -1
          });


      // =============================================
      // FORMAT USERS
      // =============================================

      const formattedusers =
        users.map((user) => ({

          ...user._doc,

          rawpassword:
            decryptpassword(
              user.password
            ),

          access_enabled:
            user.access_enabled
        }));


      // =============================================
      // RESPONSE
      // =============================================

      res.json({

        success: true,

        count:
          formattedusers.length,

        data:
          formattedusers
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        success: false,

        message:
          err.message
      });
    }
  };


// =============================================
// TOGGLE USER ACCESS
// =============================================

exports.toggle_user_access =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {

        return res.status(404)
          .json({

            success: false,

            message:
              "User not found"
          });
      }


      // =============================================
      // TOGGLE ACCESS
      // =============================================

      user.access_enabled =
        !user.access_enabled;

      await user.save();


      // =============================================
      // RESPONSE
      // =============================================

      res.json({

        success: true,

        message:
          user.access_enabled
            ? "User access enabled"
            : "User access denied",

        data: user
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        success: false,

        message:
          err.message
      });
    }
  };