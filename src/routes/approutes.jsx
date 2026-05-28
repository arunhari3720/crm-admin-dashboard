
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./protectedroute";


// pages
import UserDashboard from "../pages/userdashboar";
import HRDashboard from "../pages/hrdashboard";
import ManagerDashboard from "../pages/managerdashboard";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import Employees from "../pages/employees";
import Leave from "../pages/leave";
import Attendance from "../pages/attendance";
import Projects from "../pages/projects";
import Tasks from "../pages/tasks";
import Roles from "../pages/roles";
import Tickets from "../pages/tickets";
import Chat from "../pages/chat";
import ProjectList from "../pages/project_list";
import Invoicepage from "../pages/invoicepage";
import ExcelPage from "../pages/excelpage";
import EmployeeForm from "../components/employeeform";
import UserList from "../pages/userlist";
import CalendarPage from "../pages/calendarpage";
import BlogPage from "../pages/blogpage";
import BlogListPage from "../pages/bloglistpage";
import FieldConfigPage from "../pages/admin/fieldconfig";
import Modules from "../pages/modules";
import InvoicePreviewDemo from "../pages/invoice";
import InvoiceFieldConfig from "../pages/invoicefieldconfig";
import Fileupload from "../pages/fileupload";
import Filedownload from "../pages/filedownload";
import Users from "../pages/admin/users";
import AccessControl from "../pages/accesscontroll";
import AttendanceMonitor from "../pages/attendancemonitor";
import SubscriptionDashboard from "../pages/admin/subscriptiondashboard";
import PricingPage from "../pages/pricing/pricingpage";
import PaymentPage from "../pages/pricing/paymentpage";
import CurrentPlanPage from "../pages/pricing/currentplanpage";
import AnalyticsDashboard from "../pages/admin/analyticsdashboard";
import Team from "../pages/team";
import AI from "../pages/ai";
import CustomerForm from "../pages/customerforms";
import Permissions from "../pages/permission";

//console.log("APP ROUTES LOADED");
export default function AppRoutes({
  permissions,
  setPermissions
}) {

  return (

    <Routes>

      {/* LOGIN */}
      <Route
        path="/login"
        element={<Login />}
      />


      {/* DASHBOARD */}
      <Route
        path="dashboard"
        element={
          <ProtectedRoute
            roleRequired={[
              "admin"
              ]}
          >
            <Dashboard />
          </ProtectedRoute>
        }
      />
<Route
  path="access-control"
  element={
    <ProtectedRoute
      roleRequired="admin"
    >
      <AccessControl />
    </ProtectedRoute>
  }
/>
<Route
  path="subscription-dashboard"
  element={
    <ProtectedRoute
      roleRequired="admin"
    >
      <SubscriptionDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="hr-dashboard"
  element={
    <ProtectedRoute
      roleRequired="hr"
    >
      <HRDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="manager-dashboard"
  element={
    <ProtectedRoute
      roleRequired="manager"
    >
      <ManagerDashboard />
    </ProtectedRoute>
  }
/>



<Route
  path="user-dashboard"
  element={
    <ProtectedRoute
      roleRequired={[
        "employee",
        "user"
      ]}
    >
      <UserDashboard />
    </ProtectedRoute>
  }
/>


      {/* USERS */}
      <Route
        path="/user-form"
        element={
          <ProtectedRoute
            roleRequired={[
              "admin",
              "hr",
              "manager"
            ]}
          >
            <Users />
          </ProtectedRoute>
        }
      />


      {/* FIELD CONFIG */}
      <Route
        path="/fields"
        element={
          <ProtectedRoute
            roleRequired={[
              "admin"
            ]}
          >
            <FieldConfigPage />
          </ProtectedRoute>
        }
      />
    {/* USER LIST */}
      <Route
        path="/attendance-monitor"
        element={
          <ProtectedRoute
            roleRequired={[
              "admin",
              "hr"
            ]}
          >
            <AttendanceMonitor />
          </ProtectedRoute>
        }
      />


      {/* MODULES */}
      <Route
        path="/modules"
        element={
          <ProtectedRoute
            roleRequired={[
              "admin"
            ]}
          >
            <Modules />
          </ProtectedRoute>
        }
      />


      {/* ROLES */}
      <Route
        path="/roles"
        element={
          <ProtectedRoute
            roleRequired={[
              "admin"
            ]}
          >
            <Roles
              permissions={permissions}
              setPermissions={
                setPermissions
              }
            />
          </ProtectedRoute>
        }
      />


      {/* USER LIST */}
      <Route
        path="/user-list"
        element={
          <ProtectedRoute
            roleRequired={[
              "admin",
              "hr"
            ]}
          >
            <UserList />
          </ProtectedRoute>
        }
      />


      {/* EMPLOYEES */}
      <Route
        path="/employees"
        element={
          <ProtectedRoute
            roleRequired={[
              "admin",
              "hr",
              "manager"
            ]}
          >
            <Employees />
          </ProtectedRoute>
        }
      />


      {/* COMMON */}
      <Route path="/leave" element={<ProtectedRoute><Leave /></ProtectedRoute>} />

      <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />

      <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />

      <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />

      <Route path="/tickets" element={<ProtectedRoute><Tickets /></ProtectedRoute>} />

      <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />

      <Route path="/projects-list" element={<ProtectedRoute><ProjectList /></ProtectedRoute>} />

      <Route path="/invoices" element={<ProtectedRoute><Invoicepage /></ProtectedRoute>} />

      <Route path="/excel" element={<ProtectedRoute><ExcelPage /></ProtectedRoute>} />

      <Route path="/employee-form" element={<ProtectedRoute><EmployeeForm /></ProtectedRoute>} />

      <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />

      <Route path="/blog" element={<ProtectedRoute><BlogPage /></ProtectedRoute>} />

      <Route path="/blog-list" element={<ProtectedRoute><BlogListPage /></ProtectedRoute>} />

      <Route path="/invoice-preview" element={<ProtectedRoute><InvoicePreviewDemo /></ProtectedRoute>} />

      <Route path="/invoice-fields" element={<ProtectedRoute><InvoiceFieldConfig /></ProtectedRoute>} />

      <Route path="/file-upload" element={<ProtectedRoute><Fileupload /></ProtectedRoute>} />

      <Route path="/file-download" element={<ProtectedRoute><Filedownload /></ProtectedRoute>} />
        
        <Route path="/pricing-page" element={<ProtectedRoute><PricingPage /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
        <Route path="/current-plan" element={<ProtectedRoute><CurrentPlanPage /></ProtectedRoute>} />
        <Route path="/analytics-dashboard" element={<ProtectedRoute><AnalyticsDashboard /></ProtectedRoute>} />
        <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
        <Route path="/ai" element={<ProtectedRoute><AI /></ProtectedRoute>} />
        <Route path="/customer-form" element={<ProtectedRoute><CustomerForm /></ProtectedRoute>} />
        <Route path="/permissions" element={<ProtectedRoute><Permissions /></ProtectedRoute>} />
    </Routes>
  );
}