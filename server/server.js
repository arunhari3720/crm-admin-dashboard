require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connect_db = require("./config/db");

const project_routes = require("./routes/project_routes");
const notification_routes = require("./routes/notification_routes");
const auth_routes = require("./routes/auth_routes");
const birthday_routes = require("./routes/birthday_routes");
const invoiceroutes = require("./routes/invoiceroutes");
const excelroutes = require("./routes/excelroutes");
const fieldroutes = require("./routes/fieldroutes");
const employeeroutes = require("./routes/employeeroutes");
const customerroutes = require("./routes/customerroutes");
const event_routes = require("./routes/eventroutes");
const blogroutes = require("./routes/blogroutes");
const subscriberroutes = require("./routes/subscriberroutes");
const userroutes = require("./routes/userroutes");
const configfieldroutes = require("./routes/fieldconfigroutes");
const formroutes = require("./routes/formroutes");
const moduleroutes = require("./routes/moduleroutes");
const permissionroutes = require("./routes/permissionroutes");
const fileroutes = require("./routes/fileroutes");
const attendanceroutes = require("./routes/attendanceroutes");
const leadroutes = require("./routes/leadroutes");

// ✅ LOAD CRON HERE (TOP LEVEL)
require("./cron/birthday_cron");
require("./utils/cronjob");

const app = express();

/* DB */
connect_db();

/* middleware */
app.use(cors());
app.use(express.json());

/* routes */

app.use("/api/projects", project_routes);
app.use("/api/notifications", notification_routes);
app.use("/api/", auth_routes);
app.use("/api/birthdays", birthday_routes);
app.use("/api/invoices", invoiceroutes);
app.use("/api/excel", excelroutes);
app.use("/api/fields", fieldroutes);
app.use("/api/employees", employeeroutes);
app.use("/api/customers", customerroutes);
app.use("/api/events", event_routes);
app.use("/api/blog", blogroutes);
app.use("/api/subscriber", subscriberroutes);
app.use("/api/users", userroutes);
app.use("/api/fieldconfigs", configfieldroutes);
app.use("/api/form", formroutes);
app.use("/api/modules", moduleroutes);
app.use("/api/permissions", permissionroutes);
app.use("/api/files", fileroutes);
app.use("/api/attendance", attendanceroutes);
app.use("/api/leads", leadroutes);
/* server */
app.listen(process.env.PORT, () => {
  console.log(`server running on ${process.env.PORT}`);
});