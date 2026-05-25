import { useState, useEffect } from "react";

export default function InvoiceFieldConfig() {
  const [fields, setFields] = useState([]);

  const [newField, setNewField] = useState({
    label: "",
    name: "",
    type: "text",
    validation: "none",
    position: "top-left",
  });

  // LOAD SAVED FIELDS
  useEffect(() => {
    const savedFields = JSON.parse(
      localStorage.getItem("invoice_fields")
    );

    if (savedFields) {
      setFields(savedFields);
    }
  }, []);

  // ADD FIELD
  const addField = () => {
    if (!newField.label || !newField.name) {
      return;
    }

    const updatedFields = [...fields, newField];

    setFields(updatedFields);

    localStorage.setItem(
      "invoice_fields",
      JSON.stringify(updatedFields)
    );

    setNewField({
      label: "",
      name: "",
      type: "text",
      validation: "none",
      position: "top-left",
    });
  };

  // DELETE FIELD
  const deleteField = (index) => {
    const updatedFields = fields.filter(
      (_, i) => i !== index
    );

    setFields(updatedFields);

    localStorage.setItem(
      "invoice_fields",
      JSON.stringify(updatedFields)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Invoice Field Configuration
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Field Label"
            value={newField.label}
            onChange={(e) =>
              setNewField({
                ...newField,
                label: e.target.value,
              })
            }
            className="border border-gray-300 rounded-xl px-4 py-3 outline-none"
          />

          <input
            type="text"
            placeholder="Field Name"
            value={newField.name}
            onChange={(e) =>
              setNewField({
                ...newField,
                name: e.target.value,
              })
            }
            className="border border-gray-300 rounded-xl px-4 py-3 outline-none"
          />

          <select
            value={newField.type}
            onChange={(e) =>
              setNewField({
                ...newField,
                type: e.target.value,
              })
            }
            className="border border-gray-300 rounded-xl px-4 py-3 outline-none"
          >
            <option value="text">Text</option>
            <option value="date">Date</option>
            <option value="textarea">Textarea</option>
          </select>

          <select
            value={newField.validation}
            onChange={(e) =>
              setNewField({
                ...newField,
                validation: e.target.value,
              })
            }
            className="border border-gray-300 rounded-xl px-4 py-3 outline-none"
          >
            <option value="none">No Validation</option>
            <option value="characters">
              Only Characters
            </option>
            <option value="numbers">
              Only Numbers
            </option>
          </select>

          {/* POSITION */}
          <select
            value={newField.position}
            onChange={(e) =>
              setNewField({
                ...newField,
                position: e.target.value,
              })
            }
            className="border border-gray-300 rounded-xl px-4 py-3 outline-none"
          >
            <option value="top-left">
              Top Left
            </option>

            <option value="top-right">
              Top Right
            </option>

            <option value="center">
              Center
            </option>

            <option value="bottom-left">
              Bottom Left
            </option>

            <option value="bottom-right">
              Bottom Right
            </option>
          </select>
        </div>

        <button
          onClick={addField}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Add Field
        </button>

        {/* FIELD LIST */}
        <div className="mt-8 space-y-4">
          {fields.map((field, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-4"
            >
              <div>
                <h3 className="font-semibold text-gray-800">
                  {field.label}
                </h3>

                <p className="text-sm text-gray-500">
                  {field.name} | {field.type} |{" "}
                  {field.validation} |{" "}
                  {field.position}
                </p>
              </div>

              <button
                onClick={() => deleteField(index)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}