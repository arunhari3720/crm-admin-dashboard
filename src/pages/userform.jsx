import { useState, useEffect } from "react";
import { CreateCustomer, GetCustomers } from "../services/api";
import toast from "react-hot-toast";

export default function UserForm() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    totalprice: "",
    discount: "",
    finalprice: 0,
  });

  // ── Fetch customers from backend ──
  const fetchCustomers = async () => {
    const res = await GetCustomers();
    setCustomers(res.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // ── Stats calculated from fetched data ──
  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((sum, c) => sum + Number(c.finalprice || 0), 0);
  const activeCustomers = customers.filter((c) => Number(c.finalprice || 0) > 0).length;

  const handlechange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };

    if (step === 2) {
      const total = Number(updated.totalprice || 0);
      const discount = Number(updated.discount || 0);
      updated.finalprice = total - (discount / 100) * total;
    }

    setForm(updated);
  };

  const next = () => {
    if (!form.name || !form.email || !form.contact) {
      return toast.error("fill all fields");
    }
    setStep(2);
  };

  const save = async () => {
    if (form.discount > 100) {
      return toast.error("invalid discount");
    }

    await CreateCustomer(form);
    toast.success("saved");

    // Refresh stats after new customer is added
    fetchCustomers();

    setOpen(false);
    setStep(1);
    setForm({
      name: "",
      email: "",
      contact: "",
      totalprice: "",
      discount: "",
      finalprice: 0,
    });
  };

  const initials = form.name ? form.name.charAt(0).toUpperCase() : "?";

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">

      {/* Colorful background blobs */}
      <div className="absolute -top-40 -left-28 w-[500px] h-[500px] rounded-full bg-purple-300 opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute -top-16 -right-24 w-[380px] h-[380px] rounded-full bg-blue-300 opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-[280px] h-[280px] rounded-full bg-emerald-300 opacity-25 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 right-12 w-[240px] h-[240px] rounded-full bg-pink-300 opacity-30 blur-3xl pointer-events-none" />

      <div className="relative z-10 p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-indigo-950 tracking-tight">Customer Dashboard</h1>
            <p className="text-sm text-gray-400 mt-0.5">Manage your customers and billing</p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-violet-200 hover:shadow-violet-300 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="text-lg leading-none">+</span>
            Add Customer
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Total Customers</p>
            <p className="text-3xl font-bold text-violet-600">{totalCustomers}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Active</p>
            <p className="text-3xl font-bold text-sky-500">{activeCustomers}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Revenue</p>
            <p className="text-3xl font-bold text-emerald-500">₹{totalRevenue.toLocaleString("en-IN")}</p>
          </div>
        </div>

        {/* EMPTY STATE */}
        {totalCustomers === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center text-3xl mb-4">
              👥
            </div>
            <p className="text-base">No customers yet. Add your first one!</p>
          </div>
        )}

      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-indigo-950/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[440px] rounded-2xl shadow-2xl overflow-hidden">

            {/* Gradient modal header */}
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-5 relative">
              <h2 className="text-white font-bold text-lg">
                {step === 1 ? "Customer Details" : "Billing Info"}
              </h2>
              <p className="text-violet-200 text-xs mt-0.5">
                {step === 1 ? "Enter basic contact information" : "Set up pricing & discount"}
              </p>
              <div className="absolute top-5 right-6 flex gap-1.5 items-center">
                <div className={`h-1.5 w-7 rounded-full transition-all duration-300 ${step >= 1 ? "bg-white" : "bg-white/30"}`} />
                <div className={`h-1.5 w-7 rounded-full transition-all duration-300 ${step >= 2 ? "bg-white" : "bg-white/30"}`} />
              </div>
            </div>

            <div className="p-6">

              {/* STEP 1 */}
              {step === 1 && (
                <>
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Full Name</label>
                    <input
                      name="name"
                      placeholder="e.g. Arjun Sharma"
                      value={form.name}
                      onChange={handlechange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Email Address</label>
                    <input
                      name="email"
                      placeholder="e.g. arjun@gmail.com"
                      value={form.email}
                      onChange={handlechange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Contact Number</label>
                    <input
                      name="contact"
                      placeholder="e.g. +91 98765 43210"
                      value={form.contact}
                      onChange={handlechange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setOpen(false)}
                      className="px-5 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={next}
                      className="px-6 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold shadow-md shadow-violet-200 hover:shadow-violet-300 hover:-translate-y-0.5 transition-all"
                    >
                      Next →
                    </button>
                  </div>
                </>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <>
                  <div className="flex items-center gap-3 bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100 rounded-xl px-4 py-3 mb-5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {initials}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-indigo-950">{form.name}</p>
                      <p className="text-xs text-gray-400">{form.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Total Price (₹)</label>
                      <input
                        name="totalprice"
                        placeholder="0.00"
                        value={form.totalprice}
                        onChange={handlechange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Discount (%)</label>
                      <input
                        name="discount"
                        placeholder="0"
                        value={form.discount}
                        onChange={handlechange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mb-2">
                    <span className="text-sm font-semibold text-emerald-700">Final Amount</span>
                    <span className="text-xl font-bold text-emerald-700">
                      ₹{Number(form.finalprice).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setStep(1)}
                      className="px-5 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-all"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={save}
                      className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold shadow-md shadow-emerald-100 hover:shadow-emerald-200 hover:-translate-y-0.5 transition-all"
                    >
                      Save Customer
                    </button>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}