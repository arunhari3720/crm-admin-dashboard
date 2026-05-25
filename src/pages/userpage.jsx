import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function UserPage() {
  const [fields, setFields] = useState([]);
  const [formdata, setFormdata] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const role = localStorage.getItem("role");

  

  // 🔥 FETCH FIELDS
  const fetchfields = async () => {
    try {
      const res = await API.get("/fieldconfigs/all");

      const allFields = res.data.data || [];

      const allowed = allFields.filter((f) => f.roles?.[role]);

      setFields(allowed);
    } catch (err) {
      toast.error("Failed to load fields");
    }
  };
useEffect(() => {
    fetchfields();
  }, []);
  // 🔥 VALIDATION
  const validate = (name, value) => {
    let error = "";

    if (!value || value.trim() === "") {
      error = "This field is required";
    }

    if (name === "email" && value) {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(value)) {
        error = "Invalid email format";
      }
    }

    if (name === "contact" && value) {
      if (!/^\d{10}$/.test(value)) {
        error = "Enter valid 10-digit number";
      }
    }

    if (name === "pincode" && value) {
      if (!/^\d{6}$/.test(value)) {
        error = "Enter valid 6-digit pincode";
      }
    }

    return error;
  };

  // 🔥 HANDLE INPUT
  const handlechange = (e) => {
    const { name, value } = e.target;

    setFormdata({
      ...formdata,
      [name]: value,
    });

    const error = validate(name, value);

    setErrors({
      ...errors,
      [name]: error,
    });
  };

  // 🔥 SUBMIT
  const handlesubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    fields.forEach((f) => {
      const error = validate(f.field, formdata[f.field]);
      if (error) {
        newErrors[f.field] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors");
      return;
    }

    try {
      setLoading(true);

      await API.post("/form/create", formdata);

      toast.success("Form submitted successfully 🎉");

      setFormdata({});
      setErrors({});
    } catch (err) {
      toast.error(err.response?.data?.message || "Submit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex justify-center">

      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          User Form
        </h2>

        <form onSubmit={handlesubmit} className="space-y-4">

          {fields.length === 0 && (
            <p className="text-gray-500 text-center">
              No fields configured by admin
            </p>
          )}

          {fields.map((f) => (
            <div key={f.field}>

              <label className="block text-sm font-medium mb-1 capitalize">
                {f.field}
              </label>

              <input
                type="text"
                name={f.field}
                value={formdata[f.field] || ""}
                onChange={handlechange}
                placeholder={`Enter ${f.field}`}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors[f.field]
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-indigo-500"
                }`}
              />

              {/* 🔥 INLINE ERROR */}
              {errors[f.field] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[f.field]}
                </p>
              )}

            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

        </form>
      </div>
    </div>
  );
}