import axios from "axios";

import BASE_URL from "../config/base_url";


// ======================================
// 🔥 MAIN API INSTANCE
// =====================================
const API = axios.create({
  baseURL: BASE_URL,
});


// ======================================
//  TOKEN INTERCEPTOR
// ======================================
API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});


// ======================================
// 🔥 FIELD CONFIG SEPARATE INSTANCE
// ======================================
const FIELD_API = axios.create({
  baseURL: `${BASE_URL}/fieldconfigs`,
});


// ======================================
// 🔐 FIELD TOKEN INTERCEPTOR
// ======================================
FIELD_API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});


// ======================================================
// ===== PROJECTS =====
// ======================================================
export const getProjectsApi = (page, limit) => {
  return API.get(`/projects?page=${page}&limit=${limit}`);
};


// ======================================================
// ===== INVOICE =====
// ======================================================
export const downloadinvoicepdf = (id) =>
  API.get(`/invoices/${id}/pdf`, {
    responseType: "blob",
  });


// ======================================================
// ===== EXCEL =====
// ======================================================
export const uploadExcel = (formData) =>
  API.post("/excel/upload", formData);

export const getExcelData = () =>
  API.get("/excel/data");


// ======================================================
// ===== FIELDS (OLD SYSTEM - KEEP IF USED) =====
// ======================================================
export async function CreateField(data) {

  const res = await API.post("/fields", data);

  return res.data;

}

export async function GetFields() {

  const res = await API.get("/fields");

  return res.data;

}

export async function UpdateField(id, data) {

  const res = await API.put(`/fields/${id}`, data);

  return res.data;

}

export async function DeleteField(id) {

  const res = await API.delete(`/fields/${id}`);

  return res.data;

}


// ======================================================
// ===== EMPLOYEES =====
// ======================================================
export async function CreateEmployee(data) {

  const res = await API.post("/employees", data);

  return res.data;

}

export async function GetEmployees() {

  const res = await API.get("/employees");

  return res.data;

}

export const UpdateEmployee = (id, data) =>
  API.put(`/employees/${id}`, data);

export const DeleteEmployee = (id) =>
  API.delete(`/employees/${id}`);


// ======================================================
// ===== CUSTOMERS =====
// ======================================================
export async function CreateCustomer(data) {

  const res = await API.post("/customers", data);

  return res.data;

}

export async function GetCustomers() {

  const res = await API.get("/customers");

  return res.data;

}

export async function UpdateCustomer(id, data) {

  const res = await API.put(`/customers/${id}`, data);

  return res.data;

}

export async function DeleteCustomer(id) {

  const res = await API.delete(`/customers/${id}`);

  return res.data;

}


// ======================================================
// ===== EVENTS =====
// ======================================================
export const createEvent = (data) =>
  API.post("/events", data);

export const getEvents = () =>
  API.get("/events");

export const updateEvent = (id, data) =>
  API.put(`/events/${id}`, data);

export const deleteEvent = (id) =>
  API.delete(`/events/${id}`);


// ======================================================
// 🔥 REMOVE DEFAULT HEADER ISSUE
// ======================================================
delete API.defaults.headers.post["Content-Type"];


// ======================================================
// 🔥 FIELD CONFIG (NEW SYSTEM)
// ======================================================

// ✅ CREATE
export const CreateFieldConfig = (data) =>
  FIELD_API.post("/set", data);

// ✅ GET
export const GetFieldConfigs = () =>
  FIELD_API.get("/all");

// ✅ UPDATE
export const UpdateFieldConfig = (id, data) =>
  FIELD_API.put(`/${id}`, data);

// ✅ DELETE
export const DeleteFieldConfig = (fieldname) =>
  FIELD_API.delete(`/${fieldname}`);


// ======================================================
// 🔥 PERMISSIONS
// ======================================================

// 🔥 GET USER PERMISSIONS
export const getMyPermissions = () =>
  API.get("/permissions/me");

// 🔥 MODULES
export const getModules = () =>
  API.get("/modules");

// 🔥 SET PERMISSIONS
export const setPermissions = (data) =>
  API.post("/permissions", data);


// ======================================================
// ===== USERS =====
// ======================================================

// ✅ CREATE USER
export const CreateUser = (data) =>
  API.post("/create", data);

// ✅ GET USERS
export const GetUsers = () =>
  API.get("/users/list");


// ======================================================
// ===== USER HELPERS =====
// ======================================================
export const get_users = async () => {

  const res = await API.get("/users/list");

  return res.data;

};

export const toggle_user_access = async (id) => {

  const res = await API.put(
    `/users/toggle-access/${id}`
  );

  return res.data;

};


// ======================================================
// ===== ATTENDANCE APIs
// ======================================================

// ✅ CHECK IN
export const checkIn = () =>
  API.post("/attendance/check-in");

// ✅ CHECK OUT
export const checkOut = () =>
  API.post("/attendance/check-out");

// ✅ MY ATTENDANCE
export const getMyAttendance = () =>
  API.get("/attendance/my-attendance");

// ✅ MY SUMMARY
export const getAttendanceSummary = () =>
  API.get("/attendance/summary");

// ✅ ALL ATTENDANCE
export const getAllAttendance = () =>
  API.get("/attendance/all");

// ✅ LIVE ATTENDANCE
export const getLiveAttendance = () =>
  API.get("/attendance/live-attendance");

// ✅ TODAY ATTENDANCE
export const getTodayAttendance = () =>
  API.get("/attendance/today");


// ======================================================
// 🔥 EXPORT DEFAULT API
// ======================================================
export default API;