const PDFDocument = require("pdfkit");
const QRCode     = require("qrcode");
const https      = require("https");

/* ================= LOGO CACHE ================= */
// FIX: Fetch logo once at module load — cached as buffer
// No re-fetch on every PDF request, no external dependency needed
const LOGO_URL =
  "https://res.cloudinary.com/ddr4xqgbu/image/upload/v1777371383/output-onlinepngtools_dndher.png";

let logobuffer = null;

const fetchlogo = () =>
  new Promise((resolve) => {
    https
      .get(LOGO_URL, (response) => {
        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => resolve(Buffer.concat(chunks)));
        response.on("error", () => resolve(null));
      })
      .on("error", () => resolve(null));
  });

// Pre-fetch logo when module loads
fetchlogo().then((buf) => {
  logobuffer = buf;
  //console.log(logobuffer ? "Logo loaded" : "Logo failed to load");
});

/* ================= MAIN FUNCTION ================= */
const generatepdf = (res, invoice) => {
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
      `attachment; filename=salary_${invoice.employeeid}.pdf`
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
      const savedY     = doc.y;
      const footerY    = PAGE_H - 45;
      const prevBottom = doc.page.margins.bottom;
      doc.page.margins.bottom = 0;

      // LEFT: "Powered by Admin Dashboard"
       // ✅ CENTER → Page Number
  doc
    .fontSize(9)
    .fillColor("gray")
    .text(
      `Page ${pagenum}`,
      0,
      footerY,
      {
        width: PAGE_W,
        align: "center",
        lineBreak: false
      }
    );

  // ✅ RIGHT → Powered by
  doc
    .fontSize(9)
    .fillColor("#aaaaaa")
    .text(
      "Powered by Admin Dashboard",
      0,
      footerY,
      {
        width: PAGE_W - 50,
        align: "right",
        lineBreak: false
      }
    );

  doc.page.margins.bottom = prevBottom;
  doc.y = savedY;
  doc.fontSize(10).fillColor("black");
};

    /* ================= DATE ================= */
    const drawdate = () => {
      const savedY  = doc.y;
      const prevTop = doc.page.margins.top;
      doc.page.margins.top = 0;

      const today = new Date().toLocaleDateString("en-IN", {
        day:   "2-digit",
        month: "short",
        year:  "numeric",
      });

      doc
        .fontSize(9)
        .fillColor("gray")
        .text("Date:", PAGE_W - 160, 18, {
          width: 30,
          align: "left",
          lineBreak: false,
        });

      doc
        .fontSize(9)
        .fillColor("#222222")
        .text(today, PAGE_W - 128, 18, {
          width: 80,
          align: "left",
          lineBreak: false,
        });

      doc.page.margins.top = prevTop;
      doc.y = savedY;
      doc.fontSize(10).fillColor("black");
    };

    /* ================= HEADER ================= */
    const drawheader = async () => {
      const prevTop = doc.page.margins.top;
      doc.page.margins.top = 0;

      // FIX: Logo in top-left corner — fetched from Cloudinary at module load
      if (logobuffer) {
        doc.image(logobuffer, 50, 22, { width: 55, height: 55 });
      }

      doc.page.margins.top = prevTop;

      // Header text centered in middle section (between logo and QR)
      // x:120 so text starts after logo, width:350 so it doesn't reach QR
      doc.fontSize(16).fillColor("black").text("Payslip", 120, 28, {
        align: "center",
        width: 350,
      });
      doc.moveDown(0.4);
      doc.fontSize(12).fillColor("black").text("tharun kumar private limited", 120, doc.y, {
        align: "center",
        width: 350,
      });
      doc
        .fontSize(10)
        .fillColor("black")
        .text("", 120, doc.y + 2, {
          align: "center",
          width: 350,
        })
        .text("", 120, doc.y + 2, {
          align: "center",
          width: 350,
        });

      // QR top-right
      try {
        const qrdata = `Employee: ${invoice.employeename}\nID: ${invoice.employeeid}`;
        const qr     = await QRCode.toDataURL(qrdata);
        doc.image(qr, PAGE_W - 105, 70, { width: 58 });
      } catch (e) {
        console.log("QR skipped:", e.message);
      }
    };

    /* ================= DIVIDER ================= */
    const drawdivider = () => {
      const y = doc.y;
      doc
        .moveTo(50, y)
        .lineTo(PAGE_W - 50, y)
        .lineWidth(0.5)
        .strokeColor("black")
        .stroke();
      doc.lineWidth(1).strokeColor("black");
      doc.y = y + 8;
    };

    /* ================= EMPLOYEE ================= */
    const drawemployee = () => {
      const y = doc.y + 10;
      doc.fontSize(10).fillColor("black");
      doc.text(`Employee Name : ${invoice.employeename}`, 50, y);
      doc.text(`Employee ID   : ${invoice.employeeid}`,   50, y + 15);
      doc.text(`Month         : ${invoice.month}`,         50, y + 30);
      doc.text(`Year          : ${invoice.year}`,           50, y + 45);
      doc.text(`Designation   : ${invoice.designation}`,  300, y);
      doc.y = y + 65;
    };

    /* ================= TABLE ================= */
    const drawtable = (title, data) => {
      let y = doc.y + 6;
      doc.rect(50, y, 500, 22).fillAndStroke("#f0f0f0", "#aaa");
      doc
        .fontSize(10)
        .fillColor("black")
        .text(title, 50, y + 6, { width: 500, align: "center" });
      y += 22;
      data.forEach((item) => {
        doc.rect(50, y, 350, 20).stroke("#aaa");
        doc.rect(400, y, 150, 20).stroke("#aaa");
        doc.fontSize(10).fillColor("black").text(item.label, 60, y + 5, { width: 330 });
        doc.fontSize(10).fillColor("black").text(item.value.toString(), 410, y + 5, { width: 130 });
        y += 20;
      });
      doc.y = y + 4;
    };

    /* ================= SALARY PARAGRAPH ================= */
    const drawsalaryparagraph = () => {
      const gross = invoice.basicsalary + invoice.hra + invoice.allowances;
      const ded   = invoice.deductions;
      const net   = invoice.netsalary;
      const pct   = gross > 0 ? ((ded / gross) * 100).toFixed(1) : 0;

      const text =
        `This payslip summarizes the salary details for ${invoice.employeename} ` +
        `(ID: ${invoice.employeeid}) for the period ${invoice.month}/${invoice.year}. ` +
        `The gross earnings amount to Rs.${gross}, comprising Basic Salary, HRA, and Allowances. ` +
        `A total deduction of Rs.${ded} (${pct}% of gross) has been applied, ` +
        `resulting in a net take-home salary of Rs.${net}. ` +
        `This document is confidential and intended solely for the named employee.`;

      doc.moveDown(0.6);
      doc
        .fontSize(9)
        .fillColor("#444444")
        .text(text, 50, doc.y, {
          width: PAGE_W - 100,
          align: "justify",
          lineGap: 3,
        });
      doc.moveDown(0.6);
      doc.fontSize(10).fillColor("black");
    };

    /* ================= DRAW ALL CONTENT ================= */

    await drawheader();
    drawdivider();
    drawemployee();
    drawdivider();

    drawtable("Earnings", [
      { label: "Basic Salary", value: invoice.basicsalary },
      { label: "HRA",          value: invoice.hra },
      { label: "Allowances",   value: invoice.allowances },
    ]);

    const totalearnings =
      invoice.basicsalary + invoice.hra + invoice.allowances;

    doc
      .fontSize(10)
      .fillColor("black")
      .text(`Total Earnings : ${totalearnings}`, 50, doc.y + 4, {
        align: "right",
        width: PAGE_W - 100,
      });

    doc.moveDown(1.2);

    drawtable("Deductions", [
      { label: "Deductions", value: invoice.deductions },
    ]);

    doc
      .fontSize(10)
      .fillColor("black")
      .text(`Total Deductions : ${invoice.deductions}`, 50, doc.y + 4, {
        align: "right",
        width: PAGE_W - 100,
      });

    drawsalaryparagraph();

    doc.moveDown(0.8);

    // Net salary box
    const netY = doc.y;
    doc.rect(50, netY, 500, 28).fillAndStroke("#f7f7f7", "#aaa");
    doc
      .fontSize(12)
      .fillColor("black")
      .text(`Net Salary : ${invoice.netsalary} INR`, 50, netY + 7, {
        align: "right",
        width: 490,
      });

    doc.y = netY + 38;

    /* ================= SIGNATURE ================= */
    doc.moveDown(1.5);

    const signY = doc.y;

    doc.moveTo(80,  signY).lineTo(220, signY).strokeColor("black").stroke();
    doc.moveTo(350, signY).lineTo(500, signY).stroke();

    doc
      .fontSize(10)
      .fillColor("black")
      .text("Employer Signature", 80, signY + 6, { width: 150, align: "center" });
    doc.text("Employee Signature", 350, signY + 6, { width: 150, align: "center" });

    doc.moveDown(1.5);

    /* ================= NOTE ================= */
    doc
      .fontSize(9)
      .fillColor("gray")
      .text("This is a system generated payslip", 50, doc.y, {
        align: "center",
        width: PAGE_W - 100,
        lineBreak: false,
      });

    /* ================= STAMP ALL PAGES ================= */
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

module.exports = generatepdf;