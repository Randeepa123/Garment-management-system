import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import "./css/StockReport.css"; // Link the CSS file

const StockReport = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reportLoading, setReportLoading] = useState(false);
    const [reportError, setReportError] = useState("");
    const [isReportReady, setIsReportReady] = useState(false);
    const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

    const handleGenerateReport = async () => {
        if (!startDate || !endDate) {
            alert("Please select both start and end dates for the report.");
            return;
        }

        setReportLoading(true);
        setReportError("");
        setIsReportReady(false);
        setPdfBlobUrl(null);

        try {
            const response = await axios.post(
                "http://localhost:8070/api/stock/get-report-data",
                { startDate, endDate },
                { responseType: "blob" }
            );

            const pdfBlob = new Blob([response.data], { type: "application/pdf" });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            setPdfBlobUrl(pdfUrl);
            setIsReportReady(true);
        } catch (error) {
            console.error("Error fetching report data:", error);
            if (error.response) {
                setReportError(`Failed to generate report. Server responded with status: ${error.response.status} and message: ${error.response.data?.message || error.message}`);
            } else if (error.request) {
                setReportError("Failed to generate report. No response received from the server.");
            } else {
                setReportError(`Failed to generate report. Request setup error: ${error.message}`);
            }
        } finally {
            setReportLoading(false);
        }
    };

    const handleDownloadReport = () => {
        if (pdfBlobUrl) {
            saveAs(pdfBlobUrl, `stock_report_${startDate}_to_${endDate}.pdf`);
        }
    };

    const handleCancelReport = () => {
        setIsReportReady(false);
        if (pdfBlobUrl) {
            URL.revokeObjectURL(pdfBlobUrl);
            setPdfBlobUrl(null);
        }
    };

    return (
        <div className="report-section">
            <div className="date-button-row">
            <button
                    className="report-button"
                    onClick={handleGenerateReport}
                    disabled={reportLoading}
                >
                    {reportLoading ? "Generating..." : "Generate Report"}
                </button>
                <div className="date-selection">
                    
                    <label htmlFor="start-date">Start Date:</label>
                    <input
                        type="date"
                        id="start-date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="date-selection">
                    <label htmlFor="end-date">End Date:</label>
                    <input
                        type="date"
                        id="end-date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
              
            </div>

            {reportError && <p className="error-message">{reportError}</p>}

            {isReportReady && pdfBlobUrl && (
                <div className="report-popup">
                    <h3>Stock Report Ready</h3>
                    <iframe title="Stock Report" src={pdfBlobUrl} width="100%" height="500px"></iframe>
                    <div className="popup-buttons">
                        <button onClick={handleDownloadReport}>Download</button>
                        <button onClick={handleCancelReport}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StockReport;
