const User = require(
  "../models/user_model"
);

const jwt = require(
  "jsonwebtoken"
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
// IV LENGTH
// =============================================

const ivlength = 16;


// =============================================
// ENCRYPT PASSWORD
// =============================================

const encryptpassword = (
  password
) => {

  const iv =
    crypto.randomBytes(
      ivlength
    );

  const cipher =
    crypto.createCipheriv(
      "aes-256-cbc",
      secretkey,
      iv
    );

  let encrypted =
    cipher.update(
      password,
      "utf8",
      "hex"
    );

  encrypted +=
    cipher.final("hex");

  return (
    iv.toString("hex") +
    ":" +
    encrypted
  );
};


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
// REGISTER USER
// =============================================

exports.register_user =
  async (req, res) => {

    try {

      const data = {
        ...req.body
      };


      // =============================================
      // VALIDATION
      // =============================================

      if (!data.name) {

        return res.status(400).json({
          success: false,
          message:
            "name is required"
        });
      }

      if (!data.email) {

        return res.status(400).json({
          success: false,
          message:
            "email is required"
        });
      }

      if (!data.password) {

        return res.status(400).json({
          success: false,
          message:
            "password is required"
        });
      }


      // =============================================
      // VALID ROLES
      // =============================================

      const allowedroles = [
        "admin",
        "hr",
        "manager",
        "employee",
        "user"
      ];


      if (
        data.role &&
        !allowedroles.includes(
          data.role
        )
      ) {

        return res.status(400).json({
          success: false,
          message:
            "invalid role"
        });
      }


      // =============================================
      // CHECK EMAIL
      // =============================================

      const existinguser =
        await User.findOne({
          email: data.email
        });

      if (existinguser) {

        return res.status(400).json({
          success: false,
          message:
            "email already exists"
        });
      }


      // =============================================
      // CHECK ADMIN EXISTS
      // =============================================

      const adminexists =
        await User.findOne({
          role: "admin"
        });


      // =============================================
      // FIRST ADMIN
      // =============================================

      if (!adminexists) {

        if (
          data.role !== "admin"
        ) {

          return res.status(403).json({
            success: false,
            message:
              "first user must be admin"
          });
        }

      } else {

        // login required
        if (!req.user) {

          return res.status(401).json({
            success: false,
            message:
              "unauthorized"
          });
        }


        // only admin + hr
        if (
          req.user.role !==
            "admin" &&
          req.user.role !== "hr"
        ) {

          return res.status(403).json({
            success: false,
            message:
              "only admin or hr can create users"
          });
        }


        // hr restrictions
        if (
          req.user.role === "hr"
        ) {

          if (
            data.role !==
              "employee" &&
            data.role !== "user"
          ) {

            return res.status(403).json({
              success: false,
              message:
                "hr can create only employee or user"
            });
          }
        }


        // default role
        if (!data.role) {

          data.role = "user";
        }
      }


      // =============================================
      // ENCRYPT PASSWORD
      // =============================================

      const encryptedpassword =
        encryptpassword(
          data.password
        );


      // =============================================
      // CREATE USER
      // =============================================

      const user =
        await User.create({

          name: data.name,

          email: data.email,

          password:
            encryptedpassword,

          dob: data.dob,

          role: data.role,

          department:
            data.department,

          designation:
            data.designation
        });


      // =============================================
      // RETURN USER
      // =============================================

      const userobj =
        user.toObject();

      userobj.rawpassword =
        decryptpassword(
          user.password
        );

      res.status(201).json({

        success: true,

        message:
          "user created successfully",

        data: userobj
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
// LOGIN USER
// =============================================

exports.login_user =
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body;


      // validation
      if (
        !email ||
        !password
      ) {

        return res.status(400).json({
          success: false,
          message:
            "email and password required"
        });
      }


      // =============================================
      // FIND USER
      // =============================================

      const user =
        await User.findOne({
          email
        });

      if (!user) {

        return res.status(404).json({
          success: false,
          message:
            "user not found"
        });
      }


      // =============================================
      // DECRYPT PASSWORD
      // =============================================

      const originalpassword =
        decryptpassword(
          user.password
        );


      // =============================================
      // CHECK PASSWORD
      // =============================================

      if (
        originalpassword !==
        password
      ) {

        return res.status(401).json({
          success: false,
          message:
            "incorrect password"
        });
      }


      // =============================================
      // GENERATE TOKEN
      // =============================================

      const token = jwt.sign(

        {
          _id: user._id,

          role: user.role,

          email: user.email
        },

        "secret",

        {
          expiresIn: "1d"
        }
      );


      // =============================================
      // RETURN USER
      // =============================================

      const userobj =
        user.toObject();

      userobj.rawpassword =
        decryptpassword(
          user.password
        );

      res.json({

        success: true,

        message:
          "login successful",

        token,

        user: userobj
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