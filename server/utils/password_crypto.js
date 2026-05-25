const crypto = require("crypto");

// =====================================
// SECRET KEY
// =====================================

const secretkey =
  crypto
    .createHash("sha256")
    .update("my_super_secret_key")
    .digest();


// =====================================
// IV LENGTH
// =====================================

const ivlength = 16;


// =====================================
// ENCRYPT PASSWORD
// =====================================

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


// =====================================
// DECRYPT PASSWORD
// =====================================

const decryptpassword = (
  encryptedpassword
) => {

  try {

    const parts =
      encryptedpassword.split(":");

    const iv = Buffer.from(
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
      decipher.final("utf8");

    return decrypted;

  } catch {

    return "Invalid Password";
  }
};

module.exports = {
  encryptpassword,
  decryptpassword,
};