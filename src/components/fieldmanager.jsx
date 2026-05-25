import { useEffect, useState } from "react";
import {
  GetFields,
  CreateField,
  UpdateField,
  DeleteField,
} from "../services/api";

export default function FieldManager() {
  const [fields, setFields] = useState([]);

  const [form, setForm] = useState({
    fieldname: "",
    label: "",
    datatype: "text",
    options: "",
  });

  const [editingId, setEditingId] = useState(null);

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
  }

  async function HandleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...form,
      fieldname: form.fieldname.trim().toLowerCase(),
      options: form.options ? form.options.split(",") : [],
    };

    if (editingId) {
      await UpdateField(editingId, payload);
      setEditingId(null);
    } else {
      await CreateField(payload);
    }

    setForm({
      fieldname: "",
      label: "",
      datatype: "text",
      options: "",
    });

    LoadFields();
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
    if (!confirm("Delete this field?")) return;

    await DeleteField(id);
    LoadFields();
  }

  return (
    <div className="p-6 space-y-8">

      {/* ================= FORM ================= */}
      <form
        onSubmit={HandleSubmit}
        className="bg-white shadow rounded-lg p-6 max-w-lg mx-auto space-y-4"
      >
        <h2 className="text-lg font-semibold text-center">
          {editingId ? "Edit Field" : "Add Field"}
        </h2>

        <input
          name="fieldname"
          placeholder="Field Name"
          value={form.fieldname}
          onChange={HandleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="label"
          placeholder="Label"
          value={form.label}
          onChange={HandleChange}
          className="w-full border p-2 rounded"
        />

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

        {form.datatype === "select" && (
          <input
            name="options"
            placeholder="Option1,Option2"
            value={form.options}
            onChange={HandleChange}
            className="w-full border p-2 rounded"
          />
        )}

        <button className="w-full bg-black text-white py-2 rounded">
          {editingId ? "Update Field" : "Add Field"}
        </button>
      </form>

      {/* ================= TABLE ================= */}
      <div className="bg-white shadow rounded-lg p-6">

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
              <tr key={f._id}>
                <td className="border p-2">{f.fieldname}</td>
                <td className="border p-2">{f.label}</td>
                <td className="border p-2">{f.datatype}</td>

                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => HandleEdit(f)}
                    className="bg-yellow-400 px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => HandleDelete(f._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
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