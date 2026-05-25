import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../services/api";

const PermissionContext =
  createContext();


export const PermissionProvider = ({
  children,
}) => {

  const [modules, setModules] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // =====================================
  // FETCH PERMISSIONS
  // =====================================
  const fetchPermissions =
    async () => {

      try {

        // 🔥 CHECK TOKEN FIRST
        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {

          setModules([]);

          setLoading(false);

          return;
        }


        // 🔥 API CALL
        const response =
          await API.get(
            "/permissions/me"
          );


        setModules(
          response.data.data || []
        );

      } catch (error) {

        console.log(
          "PERMISSION ERROR:",
          error
        );


        // 🔥 HANDLE 401
        if (
          error.response?.status ===
          401
        ) {

          localStorage.clear();

          window.location.href =
            "/";
        }

        setModules([]);

      } finally {

        setLoading(false);
      }
    };


  // =====================================
  // INITIAL LOAD
  // =====================================
  useEffect(() => {

    fetchPermissions();

  }, []);


  // =====================================
  // AUTO REFRESH
  // =====================================
  useEffect(() => {

    const token =
      localStorage.getItem(
        "token"
      );

    // 🔥 DON'T RUN WITHOUT TOKEN
    if (!token) return;


    const interval = setInterval(
      () => {

        fetchPermissions();

      },
      5000
    );

    return () =>
      clearInterval(interval);

  }, []);


  return (

    <PermissionContext.Provider
      value={{

        modules,

        loading,

        refreshPermissions:
          fetchPermissions,

      }}
    >

      {children}

    </PermissionContext.Provider>
  );
};


export const usePermissions = () => {

  return useContext(
    PermissionContext
  );
};