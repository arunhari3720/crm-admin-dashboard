const PDFDocument = require("pdfkit");
const QRCode = require("qrcode");
const https = require("https");

/* ================= LOGO CACHE ================= */
const LOGO_URL =
  "https://res.cloudinary.com/ddr4xqgbu/image/upload/v1777371383/output-onlinepngtools_dndher.png";

let logobuffer = null;

const fetchlogo = () =>
  new Promise((resolve) => {
    https
      .get(LOGO_URL, (response) => {
        const chunks = [];
        response.on("data", (c) => chunks.push(c));
        response.on("end", () => resolve(Buffer.concat(chunks)));
        response.on("error", () => resolve(null));
      })
      .on("error", () => resolve(null));
  });

fetchlogo().then((buf) => {
  logobuffer = buf;
});

/* ================= HELPER: Get value from Mongoose Map ================= */
/**
 * dynamicfields is defined as { type: Map, of: Mixed } in Mongoose.
 * Mongoose Map must be accessed with .get("key"), NOT ["key"] or .key
 * This helper handles all cases safely.
 */
const getDynamicValue = (dynamicfields, fieldname) => {
  if (!dynamicfields) return "-";

  let val;

  // ✅ Mongoose Map — use .get()
  if (typeof dynamicfields.get === "function") {
    val = dynamicfields.get(fieldname);

    // If not found, try case-insensitive match
    if (val === undefined || val === null) {
      const lower = fieldname.trim().toLowerCase();
      for (const [k, v] of dynamicfields) {
        if (k.trim().toLowerCase() === lower) {
          val = v;
          break;
        }
      }
    }
  } else {
    // Plain object fallback (e.g. after .lean())
    val = dynamicfields[fieldname];

    if (val === undefined || val === null) {
      const lower = fieldname.trim().toLowerCase();
      for (const key of Object.keys(dynamicfields)) {
        if (key.trim().toLowerCase() === lower) {
          val = dynamicfields[key];
          break;
        }
      }
    }
  }

  if (val === undefined || val === null) return "-";
  return String(val);
};

/* ================= MAIN ================= */
const GenerateEmployeePdf = (res, employees = [], fields = []) => {
  const run = async () => {
    const PAGE_W = 595.28;
    const PAGE_H = 841.89;

    const doc = new PDFDocument({
      size: [PAGE_W, PAGE_H],
      margins: { top: 100, bottom: 80, left: 50, right: 50 },
      autoFirstPage: true,
      bufferPages: true,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=employees_report.pdf"
    );

    doc.pipe(res);

    /* ================= WATERMARK ================= */
    const drawwatermark = () => {
      const savedY = doc.y;
      doc.save();
      doc.rotate(-45, { origin: [PAGE_W / 2, PAGE_H / 2] });
      doc
        .fontSize(60)
        .fillColor("gray")
        .opacity(0.1)
        .text("ADMIN DASHBOARD", 0, PAGE_H / 2 - 130, {
          width: PAGE_W,
          align: "center",
          lineBreak: false,
          characterSpacing: 4,
        });
      doc.restore();
      doc.opacity(1).fillColor("black").fontSize(10);
      doc.y = savedY;
    };

    /* ================= FOOTER ================= */
    const drawfooter = (pagenum) => {
      const savedY = doc.y;
      const footerY = PAGE_H - 45;
      const prevBottom = doc.page.margins.bottom;
      doc.page.margins.bottom = 0;

      doc
        .fontSize(9)
        .fillColor("gray")
        .text(`Page ${pagenum}`, 0, footerY, {
          width: PAGE_W,
          align: "center",
          lineBreak: false,
        });

      doc
        .fontSize(9)
        .fillColor("#aaaaaa")
        .text("Powered by Admin Dashboard", 0, footerY, {
          width: PAGE_W - 50,
          align: "right",
          lineBreak: false,
        });

      doc.page.margins.bottom = prevBottom;
      doc.y = savedY;
      doc.fontSize(10).fillColor("black");
    };

    /* ================= DATE ================= */
    const drawdate = () => {
      const savedY = doc.y;
      const prevTop = doc.page.margins.top;
      doc.page.margins.top = 0;

      const today = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      doc
        .fontSize(9)
        .fillColor("gray")
        .text("Date:", PAGE_W - 160, 18, { width: 30, align: "left" });

      doc
        .fontSize(9)
        .fillColor("#222")
        .text(today, PAGE_W - 128, 18, { width: 80, align: "left" });

      doc.page.margins.top = prevTop;
      doc.y = savedY;
      doc.fontSize(10).fillColor("black");
    };

    /* ================= HEADER ================= */
    const drawheader = async () => {
      const prevTop = doc.page.margins.top;
      doc.page.margins.top = 0;

      if (logobuffer) {
        doc.image(logobuffer, 50, 22, { width: 55, height: 55 });
      }

      doc.page.margins.top = prevTop;

      doc.fontSize(16).fillColor("black").text("Employee Report", 120, 28, {
        align: "center",
        width: 350,
      });

      doc.moveDown(0.4);

   doc.fontSize(12)
   .fillColor("green")   // 👈 ADD THIS
   .text("Hurryep Technologies", 120, doc.y, {
     align: "center",
     width: 350,
   });

      try {
        const qrdata = `Employees: ${employees.length}\nFields: ${fields.length}`;
        const qr = await QRCode.toDataURL(qrdata);
        doc.image(qr, PAGE_W - 110, 30, { width: 45 });
      } catch (err) {
        console.log("QR skipped:", err.message);
      }
    };

    /* ================= DIVIDER ================= */
    const drawdivider = () => {
      const y = doc.y+10;
      doc
        .moveTo(50, y)
        .lineTo(PAGE_W - 45, y)
        .lineWidth(0.5)
        .strokeColor("black")
        .stroke();
      doc.lineWidth(1).strokeColor("black");
      doc.y = y + 8;
    };

    /* ================= TABLE HEADER ROW ================= */
    const drawTableHeader = (y, tableWidth, colWidth) => {
      doc.rect(50, y, tableWidth, 24).fillAndStroke("#f0f0f0", "#aaa");

      let x = 50;
      doc.fontSize(10).fillColor("black");

      doc.text("Username", x + 5, y + 6, {
        width: colWidth - 10,
        lineBreak: false,
        ellipsis: true,
      });
      x += colWidth;

      doc.text("Email", x + 5, y + 6, {
        width: colWidth - 10,
        lineBreak: false,
        ellipsis: true,
      });
      x += colWidth;

      fields.forEach((f) => {
        doc.text(f.label, x + 5, y + 6, {
          width: colWidth - 10,
          lineBreak: false,
          ellipsis: true,
        });
        x += colWidth;
      });

      return y + 24;
    };

    /* ================= TABLE ================= */
    const drawEmployeeTable = () => {
      let y = doc.y + 10;

      const totalCols = 2 + fields.length;
      const tableWidth = PAGE_W - 100;
      const colWidth = tableWidth / totalCols;

      y = drawTableHeader(y, tableWidth, colWidth);

      employees.forEach((emp, idx) => {
        if (y > PAGE_H - 120) {
          doc.addPage();
          y = 100;
          y = drawTableHeader(y, tableWidth, colWidth);
        }

        if (idx % 2 === 0) {
          doc.rect(50, y, tableWidth, 20).fill("#fafafa").fillColor("black");
        }

        doc.rect(50, y, tableWidth, 20).stroke("#ddd");

        let rowX = 50;
        doc.fontSize(9).fillColor("black");

        doc.text(emp.username || "-", rowX + 5, y + 5, {
          width: colWidth - 10,
          lineBreak: false,
          ellipsis: true,
        });
        rowX += colWidth;

        doc.text(emp.email || "-", rowX + 5, y + 5, {
          width: colWidth - 10,
          lineBreak: false,
          ellipsis: true,
        });
        rowX += colWidth;

        fields.forEach((f) => {
          // ✅ Correctly reads from Mongoose Map using .get()
          const val = getDynamicValue(emp.dynamicfields, f.fieldname);

          doc.text(val, rowX + 5, y + 5, {
            width: colWidth - 10,
            lineBreak: false,
            ellipsis: true,
          });

          rowX += colWidth;
        });

        y += 20;
      });

      doc.y = y + 10;
    };

    /* ================= DRAW ================= */
    await drawheader();
    drawdivider();

    doc
      .fontSize(10)
      .fillColor("black")
      .text(`Total Employees: ${employees.length}`, 50, doc.y + 6);

    doc.moveDown(0.6);

    drawEmployeeTable();

    doc.moveDown(1);
    doc
      .fontSize(9)
      .fillColor("gray")
      .text("This is a system generated employee report", 50, doc.y, {
        align: "center",
        width: PAGE_W - 100,
      });

    const range = doc.bufferedPageRange();
    for (let i = 0; i < range.count; i++) {
      doc.switchToPage(range.start + i);
      drawwatermark();
      drawdate();
      drawfooter(i + 1);
    }

    doc.flushPages();

    return new Promise((resolve, reject) => {
      doc.on("end", resolve);
      doc.on("error", reject);
      res.on("error", reject);
      doc.end();
    });
  };

  return run();
};

module.exports = GenerateEmployeePdf;