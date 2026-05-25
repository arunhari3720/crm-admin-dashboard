const nodemailer = require("nodemailer");

// 🔥 DEBUG (you can remove later)
//console.log("MAIL ENV frontend_url:", process.env.frontend_url);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.email_user,
    pass: process.env.email_pass,
  },
});

const sendnewsletter = async (subscribers, blog) => {
  try {
    // ✅ SAFE FALLBACK (no logic change, just protection)
    const frontend_url =
      process.env.frontend_url || "http://localhost:5173";

    for (let sub of subscribers) {
      await transporter.sendMail({
        from: process.env.email_user,
        to: sub.email,
        subject: `New Blog: ${blog.title}`,
        html: `
        <div style="background:#f5f5f5;padding:40px">
          <div style="max-width:600px;margin:auto;background:#fff;border-radius:12px;overflow:hidden">

            ${
              blog.image
                ? `<img src="${blog.image}" style="width:100%;height:200px;object-fit:cover"/>`
                : ""
            }

            <div style="padding:20px">
              <h2>${blog.title}</h2>
              <p>${blog.content.slice(0, 200)}...</p>

              <a href="${frontend_url}/blog/${blog._id}"
                style="display:inline-block;background:black;color:white;padding:10px 16px;border-radius:6px;text-decoration:none">
                Read Full Blog
              </a>
            </div>

          </div>
        </div>
        `,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { sendnewsletter };