import PDFDocument from "pdfkit";

export function builtPdf(dataCallback, endCallback) {
  const doc = new PDFDocument();
  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  doc.fontSize(25).text("Here is some vector graphics...", 100, 100);

  doc.end();
}
