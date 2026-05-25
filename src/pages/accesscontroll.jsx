import { useEffect, useState }
from "react";

import API
from "../services/api";

import toast
from "react-hot-toast";

import {
  ShieldCheck,
  ShieldX
} from "lucide-react";

export default function AccessControl() {

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(false);


  // =============================================
  // GET USERS
  // =============================================

  const getUsers = async () => {

    try {

      setLoading(true);

      const res =
        await API.get(
          "/users/list"
        );

      setUsers(
        res.data.data
      );

    } catch (err) {

      toast.error(
        "Failed to load users"
      );

    } finally {

      setLoading(false);
    }
  };


  // =============================================
  // TOGGLE ACCESS
  // =============================================

  const toggleAccess =
    async (id) => {

      try {

        const res =
          await API.put(
            `/users/toggle-access/${id}`
          );

        toast.success(
          res.data.message
        );

        getUsers();

      } catch (err) {

        toast.error(
          err.response?.data?.message
        );
      }
    };


  useEffect(() => {

    getUsers();

  }, []);


  return (

    <div className="p-6">

      {/* HEADER */}

      <div className="mb-6">

        <h1 className="text-3xl font-bold text-gray-800">
          Access Control
        </h1>

        <p className="text-gray-500 mt-1">
          Manage user login permissions
        </p>
      </div>


      {/* TABLE */}

      <div className="bg-white rounded-2xl shadow-md overflow-hidden border">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-4 text-left">
                  User
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Role
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-center">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="5"
                    className="p-6 text-center"
                  >
                    Loading...
                  </td>

                </tr>

              ) : users.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="p-6 text-center"
                  >
                    No users found
                  </td>

                </tr>

              ) : (

                users.map((user) => (

                  <tr
                    key={user._id}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="p-4 font-medium">
                      {user.username}
                    </td>

                    <td className="p-4">
                      {user.email}
                    </td>

                    <td className="p-4 capitalize">
                      {user.role}
                    </td>

                    <td className="p-4">

                      {user.access_enabled ? (

                        <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                          Allowed
                        </span>

                      ) : (

                        <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700">
                          Denied
                        </span>
                      )}

                    </td>

                    <td className="p-4 text-center">

                      <button
                        onClick={() =>
                          toggleAccess(
                            user._id
                          )
                        }
                        className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition ${
                          user.access_enabled
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >

                        {user.access_enabled ? (
                          <div className="flex items-center gap-2">
                            <ShieldX size={16} />
                            Deny Access
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <ShieldCheck size={16} />
                            Allow Access
                          </div>
                        )}

                      </button>

                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}