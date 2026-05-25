import { useState } from "react";
import axios from "../services/api";
import toast from "react-hot-toast";
import BASE_URL from "../config/base_url";

import Inputfield from "../components/inputfield";

import {
  User,
  Hash,
  Briefcase,
  Calendar,
  IndianRupee
} from "lucide-react";

export default function Invoicepage() {
  const [form, setform] = useState({
    employeename: "",
    employeeid: "",
    designation: "",
    basicsalary: "",
    hra: "",
    allowances: "",
    deductions: "",
    month: "",
    year: ""
  });

  const [loading, setloading] = useState(false);
  const [invoiceid, setinvoiceid] = useState(null);

  const handlechange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const calculatesalary = () => {
    const basic = Number(form.basicsalary || 0);
    const hra = Number(form.hra || 0);
    const allow = Number(form.allowances || 0);
    const ded = Number(form.deductions || 0);

    return basic + hra + allow - ded;
  };

  // 🔥 CREATE INVOICE
  const handlesubmit = async (e) => {
    e.preventDefault();

    // 🔐 FRONTEND VALIDATION
    if (
      !form.employeename ||
      !form.employeeid ||
      !form.designation ||
      !form.month ||
      !form.year
    ) {
      return toast.error("please fill all required fields");
    }

    if (
      !form.basicsalary ||
      !form.hra ||
      !form.allowances ||
      !form.deductions
    ) {
      return toast.error("please enter salary details");
    }

    try {
      setloading(true);

      const res = await axios.post("/invoices", {
        ...form,
        netsalary: calculatesalary()
      });

      const id = res.data.data._id;

      setinvoiceid(id);

      toast.success("invoice created successfully");

      // optional: reset form
      setform({
        employeename: "",
        employeeid: "",
        designation: "",
        basicsalary: "",
        hra: "",
        allowances: "",
        deductions: "",
        month: "",
        year: ""
      });

    } catch (err) {
      toast.error(err.response?.data?.message || "error creating invoice");
    } finally {
      setloading(false);
    }
  };

  // 🔥 DOWNLOAD PDF
  const downloadpdf = () => {
    if (!invoiceid) {
      return toast.error("please create invoice first");
    }

    window.open(
  `${BASE_URL}/invoices/${invoiceid}/pdf`
);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">

      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            salary invoice generator
          </h1>
          <p className="text-sm text-gray-500">
            create and download employee payslip
          </p>
        </div>

        <form onSubmit={handlesubmit} className="space-y-6">

          {/* EMPLOYEE DETAILS */}
          <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
            <h2 className="text-sm font-semibold text-gray-600 mb-4">
              employee details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <Inputfield
                label="employee name"
                name="employeename"
                value={form.employeename}
                onChange={handlechange}
                icon={<User size={16} />}
              />

              <Inputfield
                label="employee id"
                name="employeeid"
                value={form.employeeid}
                onChange={handlechange}
                icon={<Hash size={16} />}
              />

              <Inputfield
                label="designation"
                name="designation"
                value={form.designation}
                onChange={handlechange}
                icon={<Briefcase size={16} />}
              />

              <Inputfield
                label="month"
                name="month"
                value={form.month}
                onChange={handlechange}
                icon={<Calendar size={16} />}
              />

              <Inputfield
                label="year"
                name="year"
                value={form.year}
                onChange={handlechange}
                icon={<Calendar size={16} />}
              />

            </div>
          </div>

          {/* SALARY DETAILS */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow border border-gray-100">
            <h2 className="text-sm font-semibold text-gray-600 mb-4">
              salary breakdown
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <Inputfield
                label="basic salary"
                name="basicsalary"
                value={form.basicsalary}
                onChange={handlechange}
                icon={<IndianRupee size={16} />}
              />

              <Inputfield
                label="hra"
                name="hra"
                value={form.hra}
                onChange={handlechange}
                icon={<IndianRupee size={16} />}
              />

              <Inputfield
                label="allowances"
                name="allowances"
                value={form.allowances}
                onChange={handlechange}
                icon={<IndianRupee size={16} />}
              />

              <Inputfield
                label="deductions"
                name="deductions"
                value={form.deductions}
                onChange={handlechange}
                icon={<IndianRupee size={16} />}
              />

            </div>
          </div>

          {/* NET SALARY */}
        <div className="bg-indigo-600 text-white p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 shadow-lg ">

            <span className="text-sm">net salary</span>
            <span className="text-xl sm:text-2xl font-bold break-all">
              ₹ {calculatesalary()}
            </span>
          </div>

          {/* BUTTONS */}
          <div className="grid grid-cols-2 gap-4">

            {/* CREATE */}
            <button
              type="submit"
              disabled={loading}
              className={`py-3 rounded-xl text-white font-medium transition ${
                loading
                  ? "bg-gray-400"
                  : "bg-indigo-600 hover:bg-indigo-700 shadow-md"
              }`}
            >
              {loading ? "creating..." : "create invoice"}
            </button>

            {/* DOWNLOAD */}
            <button
              type="button"
              onClick={downloadpdf}
              disabled={!invoiceid}
              className={`py-3 rounded-xl border font-medium transition ${
                invoiceid
                  ? "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                  : "border-gray-300 text-gray-400 cursor-not-allowed"
              }`}
            >
              download pdf
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}