import { useState } from "react";

import {
  useNavigate,
  Navigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ShieldCheck,
} from "lucide-react";

import API from "../services/api";


export default function Login() {

  const navigate =
    useNavigate();

  const token =
    localStorage.getItem(
      "token"
    );

  const role =
    localStorage.getItem(
      "role"
    );


 
  // =====================================
  // STATES
  // =====================================

  const [form, setForm] =
    useState({

      email: "",

      password: "",
    });

  const [
    showPassword,
    setShowPassword
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

 // =====================================
  // ALREADY LOGGED IN
  // =====================================

  if (
    token &&
    role &&
    window.location.pathname ===
      "/login"
  ) {

    // ADMIN
    if (role === "admin") {

      return (
        <Navigate
          to="/dashboard"
          replace
        />
      );
    }

    // HR
    else if (
      role === "hr"
    ) {

      return (
        <Navigate
          to="/hr-dashboard"
          replace
        />
      );
    }

    // MANAGER
    else if (
      role === "manager"
    ) {

      return (
        <Navigate
          to="/manager-dashboard"
          replace
        />
      );
    }

    // USER
    else {

      return (
        <Navigate
          to="/user-dashboard"
          replace
        />
      );
    }
  }


  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handlechange = (e) => {

    const { name, value } =
      e.target;

    setForm({
      ...form,
      [name]: value
    });
  };


  // =====================================
  // LOGIN
  // =====================================

  const handleLogin =
    async () => {

      try {

        // =====================================
        // VALIDATION
        // =====================================

        if (
          !form.email ||
          !form.password
        ) {

          return toast.error(
            "All fields are required"
          );
        }

        setLoading(true);


        // =====================================
        // CLEAR OLD STORAGE
        // =====================================

        localStorage.clear();


        // =====================================
        // LOGIN API
        // =====================================

        const res =
          await API.post(
            "/login",
            form
          );


      // =====================================
      // ACCESS DENIED CHECK
      // =====================================

      if (
        !res.data.user
          ?.access_enabled
      ) {

        return toast.error(
          "Your access has been denied by admin. Please contact admin."
        );
      }

        // =====================================
        // CHECK RESPONSE
        // =====================================

        if (
          !res.data.success
        ) {

          return toast.error(
            res.data.message
          );
        }


        // =====================================
        // STORE DATA
        // =====================================

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "role",
          res.data.user.role
        );

        localStorage.setItem(
          "userId",
          res.data.user._id
        );

        localStorage.setItem(
          "username",
          res.data.user.name
        );


        // =====================================
        // SUCCESS MESSAGE
        // =====================================

        toast.success(
          "Login successful"
        );


        // =====================================
        // ROLE BASED REDIRECT
        // =====================================

        const userrole =
          res.data.user.role;


        // ADMIN
        if (
          userrole === "admin"
        ) {

          navigate(
            "/dashboard"
          );
        }

        // HR
        else if (
          userrole === "hr"
        ) {

          navigate(
            "/hr-dashboard"
          );
        }

        // MANAGER
        else if (
          userrole === "manager"
        ) {

          navigate(
            "/manager-dashboard"
          );
        }

        // USER
        else {

          navigate(
            "/user-dashboard"
          );
        }

      } catch (err) {

        console.log(err);

        toast.error(

          err.response?.data
            ?.message ||

          "Login failed"
        );

      } finally {

        setLoading(false);
      }
    };


  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-slate-100
        px-4
      "
    >

      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-2xl
          shadow-lg
          p-8
        "
      >

        {/* ===================================== */}
        {/* TOP SECTION */}
        {/* ===================================== */}

        <div
          className="
            text-center
            mb-8
          "
        >

          <div
            className="
              w-16
              h-16
              mx-auto
              rounded-2xl
              bg-black
              text-white
              flex
              items-center
              justify-center
              mb-4
            "
          >

            <ShieldCheck
              size={30}
            />

          </div>

          <h1
            className="
              text-3xl
              font-bold
              text-gray-800
            "
          >
            CRM Login
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Login to continue
          </p>

        </div>


        {/* ===================================== */}
        {/* EMAIL */}
        {/* ===================================== */}

        <div className="mb-5">

          <label
            className="
              text-sm
              text-gray-600
            "
          >
            Email
          </label>

          <div
            className="
              relative
              mt-2
            "
          >

            <Mail
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="email"

              name="email"

              placeholder="Enter email"

              value={form.email}

              onChange={
                handlechange
              }

              className="
                w-full
                border
                rounded-lg
                pl-11
                pr-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-black
              "
            />

          </div>

        </div>


        {/* ===================================== */}
        {/* PASSWORD */}
        {/* ===================================== */}

        <div className="mb-6">

          <label
            className="
              text-sm
              text-gray-600
            "
          >
            Password
          </label>

          <div
            className="
              relative
              mt-2
            "
          >

            <Lock
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }

              name="password"

              placeholder="Enter password"

              value={form.password}

              onChange={
                handlechange
              }

              onKeyDown={(e) => {

                if (
                  e.key ===
                  "Enter"
                ) {

                  handleLogin();
                }
              }}

              className="
                w-full
                border
                rounded-lg
                pl-11
                pr-12
                py-3
                outline-none
                focus:ring-2
                focus:ring-black
              "
            />

            {/* ===================================== */}
            {/* SHOW PASSWORD */}
            {/* ===================================== */}

            <button
              type="button"

              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }

              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
            >

              {
                showPassword

                  ? (
                    <EyeOff
                      size={18}
                    />
                  )

                  : (
                    <Eye
                      size={18}
                    />
                  )
              }

            </button>

          </div>

        </div>


        {/* ===================================== */}
        {/* LOGIN BUTTON */}
        {/* ===================================== */}

        <button

          onClick={handleLogin}

          disabled={loading}

          className="
            w-full
            bg-black
            hover:bg-gray-900
            text-white
            py-3
            rounded-lg
            font-semibold
            transition
          "
        >

          {
            loading

              ? "Logging in..."

              : "Login"
          }

        </button>

      </div>

    </div>
  );
}