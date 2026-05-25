import { useEffect, useState } from "react";
import {
  CreateField,
  GetFields,
  UpdateField,
  DeleteField,
} from "../services/api";

import toast from "react-hot-toast";

export default function FieldForm() {
  const [fields, setFields] = useState([]);

  const [form, setForm] = useState({
    fieldname: "",
    label: "",
    datatype: "text",
    options: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  // ================= LOAD =================
  const LoadFields = async () => {
    const data = await GetFields();
    setFields(data);
  };

  useEffect(() => {
    LoadFields();
  }, []);

  // ================= HANDLE =================
  function HandleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });

    // clear error on typing
    setErrors({ ...errors, [e.target.name]: "" });
  }

  // ================= VALIDATION =================
  function ValidateForm() {
    const newErrors = {};

    if (!form.fieldname.trim()) {
      newErrors.fieldname = "Field name required";
    } else if (form.fieldname.includes(" ")) {
      newErrors.fieldname = "No spaces allowed";
    }

    if (!form.label.trim()) {
      newErrors.label = "Label required";
    }

    if (form.datatype === "select" && !form.options.trim()) {
      newErrors.options = "Options required";
    }

    // 🔥 duplicate check
    const exists = fields.find(
      (f) =>
        f.fieldname.toLowerCase() === form.fieldname.trim().toLowerCase() &&
        f._id !== editingId
    );

    if (exists) {
      newErrors.fieldname = "Field already exists";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  // ================= SUBMIT =================
  async function HandleSubmit(e) {
    e.preventDefault();

    if (!ValidateForm()) {
      toast.error("Fix validation errors");
      return;
    }

    const payload = {
      ...form,
      fieldname: form.fieldname.trim().toLowerCase(),
      options: form.options ? form.options.split(",") : [],
    };

    try {
      if (editingId) {
        await UpdateField(editingId, payload);
        toast.success("Field updated");
        setEditingId(null);
      } else {
        await CreateField(payload);
        toast.success("Field created");
      }

      setForm({
        fieldname: "",
        label: "",
        datatype: "text",
        options: "",
      });

      setErrors({});
      LoadFields();

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  }

  // ================= EDIT =================
  function HandleEdit(field) {
    setForm({
      fieldname: field.fieldname,
      label: field.label,
      datatype: field.datatype,
      options: field.options?.join(",") || "",
    });

    setEditingId(field._id);
  }

  // ================= DELETE =================
  async function HandleDelete(id) {
    try {
      await DeleteField(id);
      toast.success("Field deleted");
      LoadFields();
    } catch (err) {
      toast.error("Delete failed");
    }
  }

  // ================= UI =================
  const inputStyle =
    "w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-black";

  const errorStyle = "border-red-500";

  return (
    <div className="p-6 space-y-10">

      {/* FORM */}
      <form
        onSubmit={HandleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 max-w-xl mx-auto space-y-4"
      >
        <h2 className="text-lg font-semibold text-center">
          {editingId ? "Edit Field" : "Add Field"}
        </h2>

        {/* FIELD NAME */}
        <div>
          <input
            name="fieldname"
            placeholder="Field Name (no spaces)"
            value={form.fieldname}
            onChange={HandleChange}
            className={`${inputStyle} ${errors.fieldname ? errorStyle : ""}`}
          />
          {errors.fieldname && (
            <p className="text-red-500 text-sm">{errors.fieldname}</p>
          )}
        </div>

        {/* LABEL */}
        <div>
          <input
            name="label"
            placeholder="Label"
            value={form.label}
            onChange={HandleChange}
            className={`${inputStyle} ${errors.label ? errorStyle : ""}`}
          />
          {errors.label && (
            <p className="text-red-500 text-sm">{errors.label}</p>
          )}
        </div>

        {/* DATATYPE */}
        <select
          name="datatype"
          value={form.datatype}
          onChange={HandleChange}
          className="w-full border p-2 rounded"
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
          <option value="select">Select</option>
          <option value="boolean">Boolean</option>
        </select>

        {/* OPTIONS */}
        {form.datatype === "select" && (
          <div>
            <input
              name="options"
              placeholder="Option1,Option2"
              value={form.options}
              onChange={HandleChange}
              className={`${inputStyle} ${errors.options ? errorStyle : ""}`}
            />
            {errors.options && (
              <p className="text-red-500 text-sm">{errors.options}</p>
            )}
          </div>
        )}

        <button
          disabled={!form.fieldname || !form.label}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {editingId ? "Update Field" : "Add Field"}
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white shadow-lg rounded-xl p-6">

        <h2 className="text-lg font-semibold mb-4">Field List</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Field Name</th>
              <th className="border p-2">Label</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {fields.map((f) => (
              <tr key={f._id} className="hover:bg-gray-50">

                <td className="border p-2">{f.fieldname}</td>
                <td className="border p-2">{f.label}</td>
                <td className="border p-2">{f.datatype}</td>

                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => HandleEdit(f)}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => HandleDelete(f._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}