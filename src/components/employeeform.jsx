import { useEffect, useState } from "react";
import {
  GetFields,
  CreateEmployee,
  GetEmployees,
  UpdateEmployee,
  DeleteEmployee,
} from "../services/api";

import toast from "react-hot-toast";







function ErrMsg({ errors, name }) {
  return errors[name] ? (
    <p className="text-red-500 text-xs mt-1 ml-1">
      {errors[name]}
    </p>
  ) : null;
}

function Label({ text, required }) {
  return (
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
      {text}

      {required && (
        <span className="text-red-400">*</span>
      )}
    </label>
  );
}
export default function EmployeeForm() {
  const [fields, setFields] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({ username: "", email: "" });
  const [dynamicfields, setDynamicFields] = useState({});
  const [editingId, setEditingId] = useState(null);

  const [errors, setErrors] = useState({});

  // ================= LOAD =================
  const LoadFields = async () => {
    const data = await GetFields();
    setFields(data);
    const init = {};
    data.forEach((f) => {
      init[f.fieldname] = f.datatype === "boolean" ? false : "";
    });
    setDynamicFields(init);
  };

  const LoadEmployees = async () => {
    const data = await GetEmployees();
    setEmployees(data);
  };

  useEffect(() => {
    LoadFields();
    LoadEmployees();
  }, []);

  // ================= HANDLE =================
  function HandleChange(e) {
    const { name, value } = e.target;

    // ✅ FIXED: username only characters
    if (name === "username") {
      const invalid = /[^a-zA-Z\s]/.test(value);

      if (invalid) {
        setErrors((prev) => ({
          ...prev,
          username: "Only characters allowed",
        }));
      } else {
        setErrors((prev) => ({ ...prev, username: "" }));
      }

      setForm({ ...form, [name]: value });
      return;
    }

    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function HandleDynamicChange(e, key, datatype) {
    const value = e.target.value;

    if (datatype === "text") {
      const invalid = /[^a-zA-Z\s]/.test(value);
      if (invalid) {
        setErrors((prev) => ({
          ...prev,
          [key]: "Only characters are allowed",
        }));
      } else {
        setErrors((prev) => ({ ...prev, [key]: "" }));
      }

      setDynamicFields({ ...dynamicfields, [key]: value });
      return;
    }

    setDynamicFields({ ...dynamicfields, [key]: value });
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  // ================= VALIDATION =================
  function Validate() {
    const newErrors = {};

    if (!form.username.trim()) newErrors.username = "Username is required";

    // ✅ FIXED
    if (/[^a-zA-Z\s]/.test(form.username)) {
      newErrors.username = "Only characters allowed";
    }

    if (!form.email.trim()) newErrors.email = "Email is required";

    for (const f of fields) {
      const value = dynamicfields[f.fieldname];

      if (f.datatype === "text") {
        if (!value || value.trim() === "") {
          newErrors[f.fieldname] = `${f.label} is required`;
        } else if (/[^a-zA-Z\s]/.test(value)) {
          newErrors[f.fieldname] = "Only characters are allowed";
        }
      }

      if (f.datatype === "number" && (value === "" || isNaN(value))) {
        newErrors[f.fieldname] = `${f.label} must be a valid number`;
      }

      if (f.datatype === "date" && !value) {
        newErrors[f.fieldname] = `${f.label} is required`;
      }

      if (f.datatype === "select" && !f.options?.includes(value)) {
        newErrors[f.fieldname] = `Please select a valid ${f.label}`;
      }

      if (f.datatype === "boolean" && typeof value !== "boolean") {
        newErrors[f.fieldname] = `${f.label} must be true or false`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ================= (REST OF YOUR CODE — UNCHANGED) =================

  // ================= FIELD RENDER =================
  function RenderField(f) {
    const value = dynamicfields[f.fieldname];
    const hasErr = !!errors[f.fieldname];

    const base =
      "w-full px-3 py-2 rounded-xl border-2 bg-white text-gray-800 text-sm transition-all focus:outline-none focus:ring-2 ";
    const normal = "border-gray-200 focus:border-indigo-400 focus:ring-indigo-100";
    const errStyle = "border-red-400 focus:border-red-400 focus:ring-red-100";
    const cls = base + (hasErr ? errStyle : normal);

    if (f.datatype === "text")
      return (
        <input
          className={cls}
          value={value}
          placeholder={`Enter ${f.label} (letters only)`}
          onChange={(e) => HandleDynamicChange(e, f.fieldname, "text")}
        />
      );

    if (f.datatype === "number")
      return (
        <input
          type="number"
          className={cls}
          value={value}
          placeholder={`Enter ${f.label}`}
          onChange={(e) => HandleDynamicChange(e, f.fieldname, "number")}
        />
      );

    if (f.datatype === "date")
      return (
        <input
          type="date"
          className={cls}
          value={value}
          onChange={(e) => HandleDynamicChange(e, f.fieldname, "date")}
        />
      );

    if (f.datatype === "select")
      return (
        <select
          className={cls}
          value={value}
          onChange={(e) => HandleDynamicChange(e, f.fieldname, "select")}
        >
          <option value="">Select {f.label}</option>
          {f.options?.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      );

    if (f.datatype === "boolean")
      return (
        <div className="flex items-center gap-2 mt-1">
          <input
            type="checkbox"
            checked={value || false}
            className="w-4 h-4 accent-indigo-500 cursor-pointer"
            onChange={(e) => {
              setDynamicFields({ ...dynamicfields, [f.fieldname]: e.target.checked });
              if (errors[f.fieldname]) setErrors((prev) => ({ ...prev, [f.fieldname]: "" }));
            }}
          />
          <span className="text-sm text-gray-500">{value ? "Yes" : "No"}</span>
        </div>
      );
  }

  // ================= SUBMIT =================
  async function HandleSubmit(e) {
    e.preventDefault();
    if (!Validate()) return;

    try {
      if (editingId) {
        await UpdateEmployee(editingId, { ...form, dynamicfields });
        toast.success("Employee updated");
        setEditingId(null);
      } else {
        await CreateEmployee({ ...form, dynamicfields });
        toast.success("Employee created");
      }

      setForm({ username: "", email: "" });
      setErrors({});
      LoadEmployees();
    } catch {
      toast.error("Error saving employee");
    }
  }

  // ================= EDIT =================
  function HandleEdit(emp) {
    setForm({ username: emp.username, email: emp.email });
    setDynamicFields(emp.dynamicfields || {});
    setEditingId(emp._id);
    setErrors({});
  }

  // ================= DELETE =================
  async function HandleDelete(id) {
    try {
      await DeleteEmployee(id);
      toast.success("Employee deleted");
      LoadEmployees();
    } catch {
      toast.error("Delete failed");
    }
  }

  // ================= PDF =================
  function DownloadPdf() {
    window.open("http://localhost:5000/api/employees/pdf");
    toast.success("PDF downloaded");
  }


  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">

      {/* PAGE HEADER */}
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Employee Manager</h1>
          <p className="text-sm text-gray-400 mt-0.5">Add, edit and export your team</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-xl">
          👥
        </div>
      </div>

      {/* FORM CARD */}
      <form
        onSubmit={HandleSubmit}
        className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 max-w-xl mx-auto space-y-5"
      >
        {/* form title */}
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-1.5 h-7 rounded-full"
            style={{ background: editingId ? "#f59e0b" : "#6366f1" }}
          />
          <h2 className="text-base font-bold text-gray-700">
            {editingId ? "Edit Employee" : "Add New Employee"}
          </h2>
        </div>

        {/* username */}
        <div>
          <Label text="Username" required />
          <input
            name="username"
            value={form.username}
            onChange={HandleChange}
            placeholder="e.g. john_doe"
            className={`w-full px-3 py-2 rounded-xl border-2 bg-white text-sm text-gray-800 transition-all focus:outline-none focus:ring-2 ${
              errors.username
                ? "border-red-400 focus:ring-red-100"
                : "border-gray-200 focus:border-indigo-400 focus:ring-indigo-100"
            }`}
          />
         <ErrMsg
  errors={errors}
  name="username"
/>
        </div>

        {/* email */}
        <div>
          <Label text="Email" required />
          <input
            name="email"
            value={form.email}
            onChange={HandleChange}
            placeholder="e.g. john@company.com"
            className={`w-full px-3 py-2 rounded-xl border-2 bg-white text-sm text-gray-800 transition-all focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-400 focus:ring-red-100"
                : "border-gray-200 focus:border-indigo-400 focus:ring-indigo-100"
            }`}
          />
         <ErrMsg
  errors={errors}
  name="email"
/>
        </div>

        {/* dynamic fields */}
        {fields.map((f) => (
          <div key={f._id}>
            <Label text={f.label} required={f.datatype !== "boolean"} />
            {RenderField(f)}
            <ErrMsg
  errors={errors}
  name={f.fieldname}
/>
          </div>
        ))}

        {/* divider */}
        <div className="border-t border-gray-100" />

        {/* submit */}
        <button
          type="submit"
          className="w-full py-2.5 rounded-xl text-white text-sm font-bold tracking-wide transition-all hover:opacity-90 active:scale-95"
          style={{
            background: editingId
              ? "linear-gradient(90deg,#f59e0b,#ef4444)"
              : "linear-gradient(90deg,#6366f1,#8b5cf6)",
            boxShadow: editingId
              ? "0 4px 14px rgba(245,158,11,0.35)"
              : "0 4px 14px rgba(99,102,241,0.35)",
          }}
        >
          {editingId ? "🔄 Update Employee" : "Add Employee"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ username: "", email: "" });
              setErrors({});
            }}
            className="w-full py-2 rounded-xl border-2 border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
        )}
      </form>

      {/* TABLE CARD */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 max-w-5xl mx-auto overflow-x-auto">

        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-base font-bold text-gray-700">Employee List</h2>
            <p className="text-xs text-gray-400">{employees.length} total employees</p>
          </div>

          <button
            onClick={DownloadPdf}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
            style={{
              background: "linear-gradient(90deg,#0ea5e9,#6366f1)",
              boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
            }}
          >
            📄 Export PDF
          </button>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="bg-indigo-50 text-indigo-700 text-left">
              <th className="px-4 py-3 rounded-tl-xl font-semibold">Username</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              {fields.map((f) => (
                <th key={f._id} className="px-4 py-3 font-semibold">
                  {f.label}
                </th>
              ))}
              <th className="px-4 py-3 rounded-tr-xl font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {employees.map((emp) => (
              <tr key={emp._id} className="hover:bg-indigo-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-800">{emp.username}</td>
                <td className="px-4 py-3 text-gray-500">{emp.email}</td>

                {fields.map((f) => (
                  <td key={f._id} className="px-4 py-3 text-gray-600">
                    {emp.dynamicfields?.[f.fieldname] !== undefined &&
                    emp.dynamicfields?.[f.fieldname] !== ""
                      ? String(emp.dynamicfields[f.fieldname])
                      : "-"}
                  </td>
                ))}

                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => HandleEdit(emp)}
                      className="px-3 py-1.5 rounded-lg text-white text-xs font-semibold transition-all hover:opacity-90"
                      style={{ background: "linear-gradient(90deg,#f59e0b,#f97316)" }}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => HandleDelete(emp._id)}
                      className="px-3 py-1.5 rounded-lg text-white text-xs font-semibold transition-all hover:opacity-90"
                      style={{ background: "linear-gradient(90deg,#ef4444,#dc2626)" }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {employees.length === 0 && (
          <div className="text-center py-12 text-gray-300">
            <div className="text-4xl mb-2">👤</div>
            <p className="text-sm">No employees yet. Add one above!</p>
          </div>
        )}
      </div>
    </div>
  );
}