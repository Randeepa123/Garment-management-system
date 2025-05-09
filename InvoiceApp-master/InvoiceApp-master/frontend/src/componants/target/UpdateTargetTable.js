import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UpdateTargetContex } from "../../contex/UpdateTargetContex";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PrintIcon from "@mui/icons-material/Print";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const UpdateTargetTable = (props) => {
  const { refresh, setRefresh, totalIots, settotalIots } =
    useContext(UpdateTargetContex);
  const SheetNo = props.sheetNum;
  const [targets, setTargets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [operators, setoperators] = useState([]);
  const [operator, setOperator] = useState();
  const navigate = useNavigate();

  const fetchTargets = async () => {
    try {
      console.log("Fetching Targets...");
      const response = await axios.get(
        `http://localhost:8070/target/getSheet?SheetNo=${SheetNo}`
      );

      setTargets(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    settotalIots(
      targets.reduce((total, target) => {
        return (
          total + target.IOuts.reduce((sum, value) => sum + (value || 0), 0)
        );
      }, 0)
    );
  }, [targets]);

  const handleSearch = (e) => {
    setOperator("");
    setSearchTerm(e.target.value);
  };

  let searchedTargets;

  searchedTargets = targets.filter((target) =>
    target.Operation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (operator) {
    searchedTargets = targets.filter((target) =>
      target.EmployeeId.name.toLowerCase().includes(operator.toLowerCase())
    );
  }

  useEffect(() => {
    fetchTargets();
  }, [refresh]);

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        console.log("Fetching Operators...");
        const response = await axios.get(
          "http://localhost:8070/target/getAllOperators"
        );
        setoperators(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchOperators();
  }, []);

  const handleNavigate = () => {
    navigate(`/set-targets/${SheetNo}`);
  };

  const handlePrint = () => {
    const content = document.querySelector(".target-update");
    const buttons = document.querySelectorAll("button");
    const searchInputs = document.querySelectorAll(".top-button-row");

    // Temporarily hide buttons and search inputs during PDF generation
    buttons.forEach((btn) => (btn.style.display = "none"));
    searchInputs.forEach((input) => (input.style.display = "none"));

    // Create a wrapper div to include title and date
    const wrapper = document.createElement("div");
    wrapper.style.padding = "20px";

    // Add title
    const title = document.createElement("h2");
    title.textContent = "Target Sheet" + ` ${SheetNo}`;
    title.style.textAlign = "center";
    title.style.marginBottom = "10px";
    wrapper.appendChild(title);

    // Add date
    const dateDiv = document.createElement("div");
    dateDiv.textContent = `Date: ${new Date().toLocaleDateString()}`;
    dateDiv.style.textAlign = "right";
    dateDiv.style.marginBottom = "20px";
    wrapper.appendChild(dateDiv);

    // Add the original content
    wrapper.appendChild(content.cloneNode(true));
    document.body.appendChild(wrapper);

    html2canvas(wrapper, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "px", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(`target_update_sheet_${SheetNo}.pdf`);

      // Clean up - remove wrapper and restore buttons and search inputs
      document.body.removeChild(wrapper);
      buttons.forEach((btn) => (btn.style.display = "block"));
      searchInputs.forEach((input) => (input.style.display = "flex"));
    });
  };

  return (
    <>
      <div className="d-flex justify-content-between top-button-row py-3 px-5">
        <div className="d-flex gap-3">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
              <SearchOutlinedIcon />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon1"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <select
            className="form-select form-select-sm rounded"
            aria-label="Large select example"
            defaultValue={operator}
            onChange={(e) => setOperator(e.target.value)}
          >
            <option value="">Open this select menu</option>
            {operators.map((operator) => (
              <option key={operator._id} value={operator.name}>
                {operator.name}
              </option>
            ))}
          </select>
        </div>
        <div className="d-flex gap-3">
          <button
            type="button"
            className="btn btn-primary btn-md"
            onClick={handleNavigate}
          >
            <ArrowOutwardOutlinedIcon />
            Set Target
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-md"
            onClick={handlePrint}
          >
            <PrintIcon />
            Print Table
          </button>
        </div>
      </div>
      <div className="target-update table-striped p-4">
        <table className="table rounded">
          <thead>
            <tr>
              <th scope="col">Operator</th>
              <th scope="col">X</th>
              <th scope="col" className="noWrapping">
                Operation
              </th>
              <th scope="col">Target</th>
              {[...Array(10)].map((_, i) => (
                <th key={i}>{`${8 + i}:15 - ${9 + i}:15`}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {searchedTargets.map((target) => (
              <tr key={`${target.EmployeeId._id}-${target.Operation}`}>
                <td>{target.EmployeeId.name}</td>
                <td>18</td>
                <td>{target.Operation}</td>
                <td>{target.ITarget}</td>
                {[...Array(10)].map((_, i) => (
                  <td key={`${target.EmployeeId._id}-${i}`}>
                    {target.IOuts[i] ? target.IOuts[i] : "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
