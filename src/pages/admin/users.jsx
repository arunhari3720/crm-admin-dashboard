import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import {
  CreateUser,
  GetUsers
} from "../../services/api";


export default function Users() {

  // =====================================
  // CURRENT USER ROLE
  // =====================================

  const currentrole =
    localStorage.getItem("role");


  // =====================================
  // ROLE OPTIONS
  // =====================================

  const getRoleOptions = () => {

    // ADMIN
    if (currentrole === "admin") {

      return [
        "admin",
        "manager",
        "hr",
        "employee",
        "user"
      ];
    }

    // MANAGER
    if (currentrole === "manager") {

      return [
        "hr"
      ];
    }

    // HR
    if (currentrole === "hr") {

      return [
        "employee",
        "user"
      ];
    }

    // USER
    return [];
  };


  // =====================================
  // STATES
  // =====================================

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [errors, setErrors] =
    useState({});

  const [selecteduser, setSelecteduser] =
    useState(null);

  const [opendetails, setOpendetails] =
    useState(false);

  const [showpasswords, setShowpasswords] =
    useState(false);

  const [formdata, setFormdata] =
    useState({

      name: "",

      email: "",

      password: "",

      role:
        getRoleOptions()[0] || "",

      department: "",

      designation: "",

      dob: ""
    });


  // =====================================
  // FETCH USERS
  // =====================================

  const fetchusers =
    async () => {

      try {

        setLoading(true);

        const res =
          await GetUsers();

        setUsers(
          res.data.data || []
        );

      } catch (error) {

        toast.error(
          "Failed to fetch users"
        );

      } finally {

        setLoading(false);
      }
    };


  // =====================================
  // INITIAL LOAD
  // =====================================

  useEffect(() => {

    fetchusers();

  }, []);


  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handlechange = (e) => {

    const { name, value } =
      e.target;


    // ONLY LETTERS
    if (
      name === "name" ||
      name === "department" ||
      name === "designation"
    ) {

      const onlyletters =
        /^[A-Za-z\s]*$/;

      if (
        !onlyletters.test(
          value
        )
      ) {

        return;
      }
    }


    // EMAIL VALIDATION
    if (name === "email") {

      const emailregex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        value &&
        !emailregex.test(
          value
        )
      ) {

        setErrors((prev) => ({
          ...prev,

          email:
            "Enter valid email"
        }));

      } else {

        setErrors((prev) => ({
          ...prev,

          email: ""
        }));
      }
    }


    setFormdata({

      ...formdata,

      [name]: value
    });
  };


  // =====================================
  // CREATE USER
  // =====================================

  const handlesubmit =
    async (e) => {

      e.preventDefault();

      const emailregex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !emailregex.test(
          formdata.email
        )
      ) {

        return toast.error(
          "Invalid email format"
        );
      }

      try {

        setLoading(true);

        await CreateUser(
          formdata
        );

        toast.success(
          "User created successfully"
        );

        setFormdata({

          name: "",

          email: "",

          password: "",

          role:
            getRoleOptions()[0] || "",

          department: "",

          designation: "",

          dob: ""
        });

        setErrors({});

        fetchusers();

      } catch (error) {

        toast.error(

          error.response?.data
            ?.message ||

          "Failed to create user"
        );

      } finally {

        setLoading(false);
      }
    };


  // =====================================
  // ROLE BASED VIEW USERS
  // =====================================

  const filteredusers =
    users.filter((item) => {

      // ADMIN
      if (
        currentrole === "admin"
      ) {

        return true;
      }

      // HR
      if (
        currentrole === "hr"
      ) {

        return (

          item.role ===
            "employee" ||

          item.role ===
            "user"
        );
      }

      // MANAGER
      if (
        currentrole === "manager"
      ) {

        return (
          item.role === "hr"
        );
      }

      // USER
      return false;
    });


  return (

    <div className="p-4 sm:p-6">

      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
          mb-6
        "
      >

        <div>

          <h1
            className="
              text-2xl
              font-bold
              text-gray-800
            "
          >
            User Management
          </h1>

          <p className="text-gray-500">
            Create and manage users
          </p>

        </div>


        {/* SHOW PASSWORD TOGGLE */}

        <button
          onClick={() =>
            setShowpasswords(
              !showpasswords
            )
          }
          className="
            bg-black
            text-white
            px-5
            py-3
            rounded-xl
            text-sm
            font-medium
          "
        >

          {
            showpasswords

              ? "Hide Passwords"

              : "Show Passwords"
          }

        </button>

      </div>


      {/* ===================================== */}
      {/* CREATE USER FORM */}
      {/* ===================================== */}

      {
        currentrole !== "user" && (

          <div
            className="
              bg-white
              rounded-2xl
              border
              shadow-sm
              p-6
              mb-8
            "
          >

            <h2
              className="
                text-lg
                font-semibold
                mb-5
              "
            >
              Create User
            </h2>

            <form
              onSubmit={handlesubmit}
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-4
              "
            >

              {/* NAME */}

              <div>

                <label className="text-sm font-medium">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formdata.name}
                  onChange={handlechange}
                  required
                  placeholder="Enter name"
                  className="
                    w-full
                    mt-1
                    border
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-black
                  "
                />

              </div>


              {/* EMAIL */}

              <div>

                <label className="text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formdata.email}
                  onChange={handlechange}
                  required
                  placeholder="Enter email"
                  className="
                    w-full
                    mt-1
                    border
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-black
                  "
                />

                {
                  errors.email && (

                    <p
                      className="
                        text-red-500
                        text-sm
                        mt-1
                      "
                    >
                      {errors.email}
                    </p>
                  )
                }

              </div>


              {/* PASSWORD */}

              <div>

                <label className="text-sm font-medium">
                  Password
                </label>

                <input
                  type="text"
                  name="password"
                  value={formdata.password}
                  onChange={handlechange}
                  required
                  placeholder="Enter password"
                  className="
                    w-full
                    mt-1
                    border
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-black
                  "
                />

              </div>


              {/* ROLE */}

              <div>

                <label className="text-sm font-medium">
                  Role
                </label>

                <select
                  name="role"
                  value={formdata.role}
                  onChange={handlechange}
                  className="
                    w-full
                    mt-1
                    border
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-black
                  "
                >

                  {
                    getRoleOptions().map(
                      (role) => (

                        <option
                          key={role}
                          value={role}
                        >
                          {
                            role
                              .charAt(0)
                              .toUpperCase() +

                            role.slice(1)
                          }
                        </option>
                      )
                    )
                  }

                </select>

              </div>


              {/* DEPARTMENT */}

              <div>

                <label className="text-sm font-medium">
                  Department
                </label>

                <input
                  type="text"
                  name="department"
                  value={formdata.department}
                  onChange={handlechange}
                  placeholder="Department"
                  className="
                    w-full
                    mt-1
                    border
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-black
                  "
                />

              </div>


              {/* DESIGNATION */}

              <div>

                <label className="text-sm font-medium">
                  Designation
                </label>

                <input
                  type="text"
                  name="designation"
                  value={formdata.designation}
                  onChange={handlechange}
                  placeholder="Designation"
                  className="
                    w-full
                    mt-1
                    border
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-black
                  "
                />

              </div>


              {/* DOB */}

              <div>

                <label className="text-sm font-medium">
                  Date of Birth
                </label>

                <input
                  type="date"
                  name="dob"
                  value={formdata.dob}
                  onChange={handlechange}
                  className="
                    w-full
                    mt-1
                    border
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-black
                  "
                />

              </div>


              {/* BUTTON */}

              <div
                className="
                  flex
                  items-end
                "
              >

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full
                    bg-black
                    hover:bg-gray-900
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-medium
                    transition
                  "
                >

                  {
                    loading

                      ? "Creating..."

                      : "Create User"
                  }

                </button>

              </div>

            </form>

          </div>
        )
      }


      {/* ===================================== */}
      {/* TABLE */}
      {/* ===================================== */}

      <div
        className="
          bg-white
          rounded-2xl
          border
          shadow-sm
          overflow-hidden
        "
      >

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead
              className="
                bg-gray-100
              "
            >

              <tr>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Password
                </th>

                <th className="p-4 text-left">
                  Role
                </th>

                <th className="p-4 text-left">
                  Department
                </th>

                <th className="p-4 text-left">
                  Designation
                </th>

              </tr>

            </thead>


            <tbody>

              {
                filteredusers.length > 0

                  ? (

                    filteredusers.map(
                      (item) => (

                        <tr
                          key={item._id}

                          onDoubleClick={() => {

                            setSelecteduser(item);

                            setOpendetails(true);
                          }}

                          className="
                            border-t
                            hover:bg-gray-50
                            cursor-pointer
                            transition
                          "
                        >

                          <td className="p-4">
                            {item.name}
                          </td>

                          <td className="p-4">
                            {item.email}
                          </td>

                          <td className="p-4">

                            {
                              showpasswords

                                ? (
                                  item.rawpassword
                                )

                                : (
                                  "••••••••"
                                )
                            }

                          </td>

                          <td className="p-4">

                            <span
                              className="
                                bg-gray-200
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                capitalize
                              "
                            >
                              {item.role}
                            </span>

                          </td>

                          <td className="p-4">
                            {
                              item.department ||
                              "-"
                            }
                          </td>

                          <td className="p-4">
                            {
                              item.designation ||
                              "-"
                            }
                          </td>

                        </tr>
                      )
                    )

                  )

                  : (

                    <tr>

                      <td
                        colSpan="6"
                        className="
                          text-center
                          p-8
                          text-gray-500
                        "
                      >
                        No users found
                      </td>

                    </tr>
                  )
              }

            </tbody>

          </table>

        </div>

      </div>


      {/* ===================================== */}
      {/* DETAILS DRAWER */}
      {/* ===================================== */}

      {
        opendetails &&
        selecteduser && (

          <div
            className="
              fixed
              inset-0
              bg-black/40
              z-50
              flex
              justify-end
            "
          >

            <div
              className="
                w-full
                sm:w-[450px]
                h-full
                bg-white
                shadow-2xl
                p-6
                overflow-y-auto
              "
            >

              {/* HEADER */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-8
                "
              >

                <div>

                  <h2
                    className="
                      text-2xl
                      font-bold
                    "
                  >
                    User Details
                  </h2>

                  <p className="text-gray-500">
                    CRM User Information
                  </p>

                </div>

                <button
                  onClick={() => {

                    setOpendetails(false);

                    setSelecteduser(null);
                  }}
                  className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-4
                    py-2
                    rounded-xl
                  "
                >
                  Close
                </button>

              </div>


              {/* DETAILS */}

              <div className="space-y-6">

                {/* NAME */}

                <div
                  className="
                    border
                    rounded-2xl
                    p-5
                  "
                >

                  <p
                    className="
                      text-sm
                      text-gray-500
                      mb-1
                    "
                  >
                    Name
                  </p>

                  <h3
                    className="
                      text-lg
                      font-semibold
                    "
                  >
                    {selecteduser.name}
                  </h3>

                </div>


                {/* EMAIL */}

                <div
                  className="
                    border
                    rounded-2xl
                    p-5
                  "
                >

                  <p
                    className="
                      text-sm
                      text-gray-500
                      mb-1
                    "
                  >
                    Email
                  </p>

                  <h3 className="font-semibold">
                    {selecteduser.email}
                  </h3>

                </div>


                {/* PASSWORD */}

                <div
                  className="
                    border
                    rounded-2xl
                    p-5
                  "
                >

                  <p
                    className="
                      text-sm
                      text-gray-500
                      mb-1
                    "
                  >
                    Password
                  </p>

                  <h3 className="font-semibold">
                    {
                      selecteduser.rawpassword
                    }
                  </h3>

                </div>


                {/* ROLE */}

                <div
                  className="
                    border
                    rounded-2xl
                    p-5
                  "
                >

                  <p
                    className="
                      text-sm
                      text-gray-500
                      mb-1
                    "
                  >
                    Role
                  </p>

                  <h3
                    className="
                      font-semibold
                      capitalize
                    "
                  >
                    {selecteduser.role}
                  </h3>

                </div>


                {/* DEPARTMENT */}

                <div
                  className="
                    border
                    rounded-2xl
                    p-5
                  "
                >

                  <p
                    className="
                      text-sm
                      text-gray-500
                      mb-1
                    "
                  >
                    Department
                  </p>

                  <h3 className="font-semibold">
                    {
                      selecteduser.department ||
                      "-"
                    }
                  </h3>

                </div>


                {/* DESIGNATION */}

                <div
                  className="
                    border
                    rounded-2xl
                    p-5
                  "
                >

                  <p
                    className="
                      text-sm
                      text-gray-500
                      mb-1
                    "
                  >
                    Designation
                  </p>

                  <h3 className="font-semibold">
                    {
                      selecteduser.designation ||
                      "-"
                    }
                  </h3>

                </div>


                {/* DOB */}

                <div
                  className="
                    border
                    rounded-2xl
                    p-5
                  "
                >

                  <p
                    className="
                      text-sm
                      text-gray-500
                      mb-1
                    "
                  >
                    Date of Birth
                  </p>

                  <h3 className="font-semibold">

                    {
                      selecteduser.dob

                        ? new Date(
                            selecteduser.dob
                          ).toLocaleDateString()

                        : "-"
                    }

                  </h3>

                </div>

              </div>

            </div>

          </div>
        )
      }

    </div>
  );
}