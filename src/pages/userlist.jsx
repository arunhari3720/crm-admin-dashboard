import { useEffect, useState } from "react";
import { GetCustomers, DeleteCustomer, UpdateCustomer } from "../services/api";
import toast from "react-hot-toast";

export default function UserList() {
  const [data, setData] = useState([]);
  const [editid, setEditid] = useState(null);
  const [editdata, setEditdata] = useState({});

  const fetchdata = async () => {
    const res = await GetCustomers();
    setData(res.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const startedit = (item) => {
    setEditid(item._id);
    setEditdata({ ...item });
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    const updated = { ...editdata, [name]: value };

    const total = Number(updated.totalprice || 0);
    const discount = Number(updated.discount || 0);
    updated.finalprice = total - (discount / 100) * total;

    setEditdata(updated);
  };

  const saveedit = async () => {
    await UpdateCustomer(editdata._id, editdata);
    toast.success("updated");
    setEditid(null);
    fetchdata();
  };

  const remove = async (id) => {
    await DeleteCustomer(id);
    toast.success("deleted");
    fetchdata();
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">

      {/* Colorful background blobs */}
      <div className="absolute -top-40 -left-28 w-[500px] h-[500px] rounded-full bg-purple-300 opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute -top-16 -right-24 w-[380px] h-[380px] rounded-full bg-blue-300 opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-[280px] h-[280px] rounded-full bg-emerald-300 opacity-25 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 right-12 w-[240px] h-[240px] rounded-full bg-pink-300 opacity-30 blur-3xl pointer-events-none" />

      <div className="relative z-10 p-8">

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-indigo-950 tracking-tight">All Customers</h2>
          <p className="text-sm text-gray-400 mt-0.5">{data.length} customer{data.length !== 1 ? "s" : ""} found</p>
        </div>

        {/* EMPTY STATE */}
        {data.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center text-3xl mb-4">
              👥
            </div>
            <p className="text-base">No customers yet.</p>
          </div>
        )}

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-5">
          {data.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >

              {/* EDIT MODE */}
              {editid === item._id ? (
                <div className="p-5">
                  {/* Edit header */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-xs font-semibold text-amber-600 uppercase tracking-widest">Editing</span>
                  </div>

                  <div className="mb-3">
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Name</label>
                    <input
                      name="name"
                      value={editdata.name}
                      onChange={handlechange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Total Price (₹)</label>
                      <input
                        name="totalprice"
                        value={editdata.totalprice}
                        onChange={handlechange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Discount (%)</label>
                      <input
                        name="discount"
                        value={editdata.discount}
                        onChange={handlechange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Live final price */}
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 mb-4">
                    <span className="text-sm font-semibold text-emerald-700">Final Amount</span>
                    <span className="text-lg font-bold text-emerald-700">₹{Number(editdata.finalprice).toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditid(null)}
                      className="flex-1 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveedit}
                      className="flex-1 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold shadow-md shadow-violet-100 hover:shadow-violet-200 hover:-translate-y-0.5 transition-all"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (

                /* VIEW MODE */
                <>
                  {/* Card top accent */}
                  <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-indigo-400 to-blue-400" />

                  <div className="p-5">
                    {/* Customer info */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {item.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-400">{item.email}</p>
                      </div>
                    </div>

                    {/* Pricing row */}
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 mb-4">
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-0.5">Total</p>
                        <p className="text-sm font-semibold text-gray-700">₹{Number(item.totalprice).toLocaleString("en-IN")}</p>
                      </div>
                      <div className="w-px h-8 bg-gray-200" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-0.5">Discount</p>
                        <p className="text-sm font-semibold text-amber-500">{item.discount}%</p>
                      </div>
                      <div className="w-px h-8 bg-gray-200" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-0.5">Final</p>
                        <p className="text-sm font-bold text-emerald-600">₹{Number(item.finalprice).toLocaleString("en-IN")}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => startedit(item)}
                        className="flex-1 py-2 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-600 text-sm font-semibold hover:bg-indigo-100 transition-all"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => remove(item._id)}
                        className="flex-1 py-2 rounded-xl border border-red-200 bg-red-50 text-red-500 text-sm font-semibold hover:bg-red-100 transition-all"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                </>
              )}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}