import React, { useRef, useContext } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { SalaryContex } from "../../contex/SalaryContex";

export const SalarySheet = ({ employee }) => {
  const sheetRef = useRef();
  const { refresh } = useContext(SalaryContex);
  const calculateTotalSalary = () => {
    if (!employee || !employee.employee || !employee.increments) return 0;
    const basic = employee.employee.basic;
    const incrementsTotal = employee.increments.reduce(
      (sum, inc) => sum + inc.amount,
      0
    );
    return basic + incrementsTotal;
  };

  const handleDownload = () => {
    const content = sheetRef.current;
    const buttons = content.querySelectorAll("button");

    // Temporarily hide buttons during PDF generation
    buttons.forEach((btn) => (btn.style.display = "none"));

    html2canvas(content, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "px", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`salary_sheet_${employee.employee.name}.pdf`);

      // Restore buttons
      buttons.forEach((btn) => (btn.style.display = "block"));
    });
  };

  if (!employee) return null;

  return (
    <div ref={sheetRef} className="card mt-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">Salary Sheet Summary</h5>
        <button className="btn btn-primary" onClick={handleDownload}>
          Download PDF
        </button>
      </div>
      <div className="card-body">
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th scope="row">Employee Name</th>
              <td>{employee.employee.name}</td>
            </tr>
            <tr>
              <th scope="row">Position</th>
              <td>{employee.employee.post}</td>
            </tr>
            <tr>
              <th scope="row">Basic Salary</th>
              <td>Rs. {employee.employee.basic}</td>
            </tr>
            <tr>
              <th scope="row">Increments</th>
              <td>
                {employee.increments && employee.increments.length > 0 ? (
                  <ul className="list-unstyled mb-0">
                    {employee.increments.map((inc, index) => (
                      <li key={index}>
                        {inc.topic}: Rs. {inc.amount}
                      </li>
                    ))}
                  </ul>
                ) : (
                  "No increments"
                )}
              </td>
            </tr>
            <tr className="table-primary">
              <th scope="row">Total Salary</th>
              <td>Rs. {calculateTotalSalary()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
