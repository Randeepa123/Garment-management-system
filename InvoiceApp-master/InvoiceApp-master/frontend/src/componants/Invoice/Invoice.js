import { React, useContext, useEffect, useState, useRef } from "react";
import newImage from "../img/newImage.png";
import { InvoiceContex } from "../../contex/InvoiceContex";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const Invoice = ({ setEditingItem }) => {
  const { InvoiceNumber, refresh } = useContext(InvoiceContex);
  const invoiceRef = useRef();

  const [invoice, setInvoice] = useState({});
  const [customerDetails, setCustomerDetails] = useState();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const formatDate = (date) => {
    return new Date(date)
      .toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })
      .replace(",", ".");
  };

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/invoice/getInvoice?invoiceId=${InvoiceNumber}`
        );
        setInvoice(response.data);
        setItems(response.data.items || []);
        setCustomerDetails(response.data.customerId);
        setTotal(response.data.totalAmount || 0);
      } catch (error) {
        console.error("Error fetching Invoice:", error);
      }
    };

    fetchInvoice();
  }, [refresh, InvoiceNumber]);

  useEffect(() => {
    const newTotal = items.reduce((sum, item) => sum + item.total, 0);
    setTotal(newTotal);
  }, [items]);

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8070/invoice/deleteItem?invoiceId=${InvoiceNumber}&itemId=${id}`
      );
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  //download invoice
  const handleDownload = () => {
    const input = invoiceRef.current;
    const buttons = document.querySelectorAll("button");

   
    buttons.forEach((btn) => (btn.style.display = "none"));

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "px", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");

      buttons.forEach((btn) => (btn.style.display = "block"));
    });
  };

  return (
    <div ref={invoiceRef} className="invoice-container m-4">
      <div className="header">
        <div className="logo">
          <img src={newImage} alt="newImage" />
        </div>
        <div className="details">
          <div className="type1">
            <span className="name">Invoice#</span>
            <span className="value">
              {InvoiceNumber ? `T${InvoiceNumber}` : ""}
            </span>
          </div>
          <div className="type2">
            <span className="name">DATE</span>
            <span className="value">{formatDate(new Date())}</span>
          </div>
        </div>
      </div>... <div className="invoiceInfo d-flex mt-5 gap-5">
        <div className="from d-flex flex-column">
          <h4>From</h4>
          <span className="company-name">Taycantech</span>
          <span>info@taycantech.com</span>
          <span>+94 77 122 5553</span>
        </div>
        <div className="to d-flex flex-column">
          <h4>To</h4>
          <span className="company-name">
            {customerDetails ? customerDetails.name : "Customer Name"}
          </span>
          <span>
            {customerDetails ? customerDetails.email : "Customer email"}
          </span>
          <span>
            {customerDetails ? customerDetails.phone : "Customer phone"}
          </span>
        </div>
      </div>

      <div className="item-table mt-5">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Cost</th>
              <th>QTY</th>
              <th>Discount</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item._id}>
                  <td>{item.product}</td>
                  <td>LKR {item.price}</td>
                  <td>{item.quantity}</td>
                  <td>LKR{item.Discount}</td>
                  <td>LKR {item.total}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => setEditingItem(item)}
                      sx={{color:"white"}}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => handleDeleteItem(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex gap-3 width justify-content-end pe-5 pt-4 totalSection">
        <span className="title">Total</span>
        <span className="value">LKR {total}</span>
      </div>

      <div className="mt-5 d-flex flex-column tac">
        <span className="title">TERMS & CONDITIONS</span>
        <button type="button" className="btn btn-primary" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
};
