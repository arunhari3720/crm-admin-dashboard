import { useEffect, useState } from "react";

export default function InvoicePreview() {
  const [fields, setFields] = useState([]);

  const [invoice, setInvoice] = useState({});

  const [errors, setErrors] = useState({});

  // LOAD FIELDS
  useEffect(() => {
    const savedFields = JSON.parse(
      localStorage.getItem("invoice_fields")
    );

    if (savedFields) {
      setFields(savedFields);
    }
  }, []);

  // VALIDATION
  const validateField = (field, value) => {
    let error = "";

    if (field.validation === "characters") {
      const onlyCharacters = /^[A-Za-z\s]*$/;

      if (!onlyCharacters.test(value)) {
        error = "Only characters allowed";
      }
    }

    if (field.validation === "numbers") {
      const onlyNumbers = /^[0-9]*$/;

      if (!onlyNumbers.test(value)) {
        error = "Only numbers allowed";
      }
    }

    return error;
  };

  // HANDLE CHANGE
  const handleChange = (e, field) => {
    const { name, value } = e.target;

    const validationError = validateField(
      field,
      value
    );

    if (validationError) {
      setErrors({
        ...errors,
        [name]: validationError,
      });

      return;
    }

    setErrors({
      ...errors,
      [name]: "",
    });

    setInvoice({
      ...invoice,
      [name]: value,
    });
  };

  // POSITION CLASS
  const getPositionClass = (
    position,
    index
  ) => {
    switch (position) {
      case "top-left":
        return "absolute left-6";

      case "top-right":
        return "absolute right-6 text-right";

      case "center":
        return "absolute left-1/2 -translate-x-1/2 text-center";

      case "center-left":
        return "absolute left-6";

      case "center-right":
        return "absolute right-6 text-right";

      case "bottom-left":
        return "absolute left-6";

      case "bottom-right":
        return "absolute right-6 text-right";

      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT SIDE */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Invoice Fields
          </h1>

          <div className="space-y-5">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {field.label}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    rows="4"
                    name={field.name}
                    value={invoice[field.name] || ""}
                    onChange={(e) =>
                      handleChange(e, field)
                    }
                    placeholder={`Enter ${field.label}`}
                    className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 ${
                      errors[field.name]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={invoice[field.name] || ""}
                    onChange={(e) =>
                      handleChange(e, field)
                    }
                    placeholder={`Enter ${field.label}`}
                    className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400 ${
                      errors[field.name]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                )}

                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 relative min-h-[1000px] overflow-hidden">

          {/* HEADER */}
          <div className="border-b p-6 flex items-start justify-between">

            {/* LOGO */}
            <div>
              <img
                src="https://res.cloudinary.com/ddr4xqgbu/image/upload/v1778065654/H_Black_aot81t.png"
                alt="Company Logo"
                className="h-16 w-auto object-contain"
              />
            </div>

            {/* INVOICE TITLE */}
            <div className="text-right">
              <h1 className="text-5xl font-bold text-gray-900">
                INVOICE
              </h1>

              <p className="text-gray-500 mt-2 text-sm">
                Invoice Preview
              </p>
            </div>
          </div>

          {/* DYNAMIC POSITION FIELDS */}
          {fields.map((field, index) => (
            <div
              key={field.name}
              className={getPositionClass(
                field.position,
                index
              )}
              style={{
                top:
                  field.position === "top-left" ||
                  field.position === "top-right"
                    ? `${140 + index * 90}px`
                    : field.position === "center-left" ||
                      field.position === "center-right"
                    ? `${420 + index * 90}px`
                    : field.position === "center"
                    ? "50%"
                    : undefined,

                bottom:
                  field.position === "bottom-left" ||
                  field.position === "bottom-right"
                    ? `${80 + index * 90}px`
                    : undefined,
              }}
            >
              <h3 className="text-sm font-bold text-gray-700 mb-1">
                {field.label}
              </h3>

              <p className="text-gray-600 break-words max-w-[250px]">
                {invoice[field.name] ||
                  `No ${field.label}`}
              </p>
            </div>
          ))}

          {/* FOOTER */}
          <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-500">
            Thank you for your business.
          </div>
        </div>
      </div>
    </div>
  );
}