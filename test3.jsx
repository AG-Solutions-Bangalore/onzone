const printStyles = `
@media print {
  body {
    font-size: 10pt;
    line-height: 1.2;
    margin: 0;
    padding: 0;
  }
  @page {
    size: A4 landscape;
    margin: 2mm;
  }
  .print-container {
    width: 100%;
    max-width: 297mm; /* A4 landscape width */
    margin: 0 auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    page-break-inside: avoid;
    margin-bottom: 10px;
    font-size: 9pt;
  }
  table, th {
    border: 0.1px solid #000;
    border-width: 0.1px;
  }
  th, td {
    padding: 3px 5px;
    line-height: 1.1;
    vertical-align: middle;
  }
  thead {
    background-color: #f0f0f0 !important;
    -webkit-print-color-adjust: exact;
  }
  .font-semibold {
    font-weight: 600;
  }
  h3 {
    font-size: 14pt;
    margin-bottom: 10px;
  }
  * {
    -webkit-print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
}
`;
