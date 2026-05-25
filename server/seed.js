// seeders/user_seeder.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user_model");
console.log("User")

const MONGO_URI = "mongodb+srv://admin1:arunhari3720@cluster0.tscyzvw.mongodb.net/?appName=Cluster0";

const users = [
  {
    name: "Arun Kumar",
    email: "arun@test.com",
    password: "123456",
    dob: "1998-04-27",
    role: "employee"
  },
  {
    name: "Karthik Raja",
    email: "karthik@test.com",
    password: "123456",
    dob: "1995-07-12",
    role: "employee"
  },
  {
    name: "Vignesh",
    email: "vignesh@test.com",
    password: "123456",
    dob: "2000-04-27",
    role: "employee"
  },
  {
    name: "Manikandan",
    email: "mani@test.com",
    password: "123456",
    dob: "1997-04-27",
    role: "employee"
  },
  {
    name: "Ramesh",
    email: "ramesh@test.com",
    password: "123456",
    dob: "1994-04-27",
    role: "employee"
  },
  {
    name: "Admin User",
    email: "admin@test.com",
    password: "123456",
    dob: "1990-04-27",
    role: "admin"
  }
];

const seed_users = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("✅ DB Connected");

    // optional: clear old users
    await User.deleteMany();

    const hashed_users = [];

    for (let u of users) {
      const hashed_password = await bcrypt.hash(u.password, 10);

      hashed_users.push({
        ...u,
        password: hashed_password
      });
    }

    await User.insertMany(hashed_users);

    console.log("🌱 Users seeded successfully");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed_users();