import { useState } from "react";

import {
  useNavigate,
  Navigate,
} from "react-router-dom";
import {
 
  SettingOutlined,
  SearchOutlined,
  KeyOutlined,
  LockFilled,
} from "@ant-design/icons";
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

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  // =====================================
  // ALREADY LOGIN
  // =====================================

  if (
    token &&
    role &&
    window.location.pathname ===
      "#/login"
  ) {

    if (role === "admin") {

      return (
        <Navigate
          to="/dashboard"
          replace
        />
      );
    }

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
      [name]: value,
    });
  };

  // =====================================
  // LOGIN
  // =====================================

  const handleLogin =
    async () => {

      try {

        if (
          !form.email ||
          !form.password
        ) {

          return toast.error(
            "All fields are required"
          );
        }

        setLoading(true);

        localStorage.clear();

        const res =
          await API.post(
            "/login",
            form
          );

        if (
          !res.data.user
            ?.access_enabled
        ) {

          return toast.error(
            "Your access has been denied by admin."
          );
        }

        if (
          !res.data.success
        ) {

          return toast.error(
            res.data.message
          );
        }

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

        toast.success(
          "Login successful"
        );

        const userrole =
          res.data.user.role;

        if (
          userrole === "admin"
        ) {

          navigate(
            "/dashboard"
          );
        }

        else if (
          userrole === "hr"
        ) {

          navigate(
            "/hr-dashboard"
          );
        }

        else if (
          userrole ===
          "manager"
        ) {

          navigate(
            "/manager-dashboard"
          );
        }

        else {

          navigate(
            "/user-dashboard"
          );
        }

      } catch (err) {

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
        bg-[#eef2ff]
        flex
        items-center
        justify-center
        p-4
        overflow-hidden
      "
    >

      <div
        className="
          w-full
          max-w-[1180px]
          min-h-[650px]
          bg-white
          rounded-[34px]
          overflow-hidden
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          grid
          grid-cols-1
          lg:grid-cols-2
        "
      >

        {/* ===================================== */}
        {/* LEFT SIDE */}
        {/* ===================================== */}

        <div className="hidden lg:flex flex-col bg-[#f5f8ff] relative overflow-hidden px-8 py-7 items-center justify-between">
          {/* background shape */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100/30 rounded-br-[140px]"></div>

          {/* logo */}
        

          {/* illustration wrapper */}
          <div className="relative flex items-center justify-center w-full flex-1 z-10">
            {/* floating icons */}

            {/* key */}
            <div className="absolute top-[62px] left-[42px] w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-yellow-400 text-xl z-20">
              <KeyOutlined />
            </div>

            {/* settings */}
            <div className="absolute top-[-6px] left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-blue-500 text-xl z-20">
              <SettingOutlined />
            </div>

            {/* search */}
            <div className="absolute top-[90px] right-[18px] w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-green-500 text-xl z-20">
              <SearchOutlined />
            </div>

            {/* lock */}
            <div className="absolute bottom-[55px] right-[70px] w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-yellow-500 text-xl z-20">
              <LockFilled />
            </div>
            {/* illustration */}
            <img
              src="https://res.cloudinary.com/ddr4xqgbu/image/upload/v1779948873/Adobe_Express_-_file_fprlpc.png"
              alt="crm illustration"
              className="w-[400px] object-contain relative z-10"
            />
          </div>

          {/* content */}
          <div className="text-center z-10 mt-2">
            
            <p className="text-gray-500 text-sm leading-7 max-w-sm mx-auto">
              Manage employees, customers and business operations efficiently
              with our powerful CRM platform.
            </p>
          </div>
        </div>
        {/* ===================================== */}
        {/* RIGHT SIDE */}
        {/* ===================================== */}

        <div
          className="
            flex
            items-center
            justify-center
            px-6
            sm:px-10
            lg:px-16
            py-10
            bg-white
          "
        >

          <div
            className="
              w-full
              max-w-md
            "
          >

            {/* MOBILE ICON */}

            <div
              className="
                lg:hidden
                flex
                justify-center
                mb-8
              "
            >

              <div
                className="
                  w-20
                  h-20
                  rounded-[24px]
                  bg-black
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-xl
                "
              >

                <ShieldCheck
                  size={40}
                />

              </div>

            </div>

            {/* HEADING */}

            <div className="mb-10">

              <h2
                className="
                  text-4xl
                  font-bold
                  text-gray-800
                  mb-3
                "
              >
                Welcome Back
              </h2>

              <p
                className="
                  text-gray-500
                  leading-7
                "
              >
                Login to continue
                accessing your CRM
                dashboard.
              </p>

            </div>

            {/* EMAIL */}

            <div className="mb-5">

              <label
                className="
                  text-sm
                  font-medium
                  text-gray-600
                "
              >
                Email Address
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
                    h-14
                    border
                    border-gray-200
                    rounded-2xl
                    pl-12
                    pr-4
                    bg-gray-50
                    outline-none
                    focus:border-black
                    focus:bg-white
                    transition
                  "
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="mb-8">

              <label
                className="
                  text-sm
                  font-medium
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
                    h-14
                    border
                    border-gray-200
                    rounded-2xl
                    pl-12
                    pr-12
                    bg-gray-50
                    outline-none
                    focus:border-black
                    focus:bg-white
                    transition
                  "
                />

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
                          size={20}
                        />
                      )

                      : (
                        <Eye
                          size={20}
                        />
                      )
                  }

                </button>

              </div>

            </div>

            {/* BUTTON */}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="
                w-full
                h-14
                rounded-2xl
                bg-black
                hover:bg-gray-900
                text-white
                font-semibold
                text-base
                transition-all
                duration-300
                shadow-lg
                hover:scale-[1.01]
                active:scale-[0.99]
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

      </div>

    </div>
  );
}