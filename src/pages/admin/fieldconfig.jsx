import { useEffect, useState } from "react";
import {
  CreateFieldConfig,
  GetFieldConfigs,
  UpdateFieldConfig,
} from "../../services/api";
import toast from "react-hot-toast";

export default function FieldConfig() {
  const [field, setField] = useState("");
  const [userAccess, setUserAccess] = useState(false);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

 
  // ✅ FIXED FETCH
  const fetchFields = async () => {
    try {
      const res = await GetFieldConfigs();
 

      //console.log("FETCH RESPONSE:", res.data); // 🔍 debug

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      setFields(res.data.data || []);
    } catch (err) {
      console.error("FETCH ERROR:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to load fields");
    }
   
  };
 useEffect(() => {
    fetchFields();
  }, []);
  // ✅ CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!field.trim()) {
      return toast.error("Field name is required");
    }

    try {
      setLoading(true);

      const res = await CreateFieldConfig({
        field,
        roles: {
          admin: true,
          user: userAccess,
        },
      });

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Field added ✅");

      setField("");
      setUserAccess(false);
      fetchFields();

    } catch (err) {
      console.error("CREATE ERROR:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Error adding field");
    } finally {
      setLoading(false);
    }
  };

  // ✅ TOGGLE
  const handleToggle = async (f, index) => {
    const updated = [...fields];
    const newFields = [...updated];

newFields[index] = {
  ...newFields[index],
  roles: {
    ...newFields[index].roles,
    user: !newFields[index].roles.user,
  },
};

    setFields(updated);

    try {
      const res = await UpdateFieldConfig(f._id, {
        field: f.field,
        roles: updated[index].roles,
      });

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Access updated ✅");

    } catch (err) {
      console.error("TOGGLE ERROR:", err.response?.data || err.message);

     const rollback = [...updated];

rollback[index] = {

  ...rollback[index],

  roles: {

    ...rollback[index].roles,

    user:
      !rollback[index]
        .roles.user,
  },
};

setFields(rollback);
      toast.error(err.response?.data?.message || "Update failed ❌");
    }
  };

  // ✅ START EDIT
  const startEdit = (f) => {
    setEditId(f._id);
    setEditValue(f.field);
  };

  // ✅ SAVE EDIT
  const saveEdit = async (f) => {
    if (!editValue.trim()) {
      return toast.error("Field name cannot be empty");
    }

    try {
      const res = await UpdateFieldConfig(f._id, {
        field: editValue,
        roles: f.roles,
      });

      if (!res.data.success) {
        throw new Error(res.data.message);
      }

      toast.success("Field name updated ✅");

      setEditId(null);
      fetchFields();

    } catch (err) {
      console.error("EDIT ERROR:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Update failed ❌");
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditValue("");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-semibold mb-6">
        Field Configuration
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* CREATE */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            Add Field
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              value={field}
              onChange={(e) => setField(e.target.value)}
              placeholder="Enter field name"
              className="w-full border p-3 rounded-lg"
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={userAccess}
                onChange={() => setUserAccess(!userAccess)}
              />
              User Access
            </label>

            <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
              {loading ? "Saving..." : "Add Field"}
            </button>

          </form>
        </div>

        {/* LIST */}
        <div className="bg-white p-6 rounded-2xl shadow-md">

          <h2 className="text-lg font-semibold mb-4">
            Manage Fields
          </h2>

          <div className="space-y-3">

            {fields.length === 0 ? (
              <p className="text-gray-500 text-sm">No fields found</p>
            ) : (
              fields.map((f, index) => (
                <div
                  key={f._id}
                  className="flex justify-between items-center p-3 border rounded-lg"
                >

                  {/* FIELD NAME */}
                  <div className="flex-1">
                    {editId === f._id ? (
                      <input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="border p-2 rounded w-full"
                      />
                    ) : (
                      <p
                        onDoubleClick={() => startEdit(f)}
                        className="font-medium cursor-pointer"
                      >
                        {f.field}
                      </p>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-3 ml-4">

                    <input
                      type="checkbox"
                      checked={f.roles?.user}
                      onChange={() => handleToggle(f, index)}
                      className="w-5 h-5"
                    />

                    <span
                      className={`text-xs ${
                        f.roles?.user
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {f.roles?.user ? "Allowed" : "Denied"}
                    </span>

                    {editId === f._id && (
                      <>
                        <button
                          onClick={() => saveEdit(f)}
                          className="px-2 py-1 text-xs bg-green-500 text-white rounded"
                        >
                          Save
                        </button>

                        <button
                          onClick={cancelEdit}
                          className="px-2 py-1 text-xs bg-red-500 text-white rounded"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                  </div>
                </div>
              ))
            )}

          </div>

        </div>

      </div>
    </div>
  );
}