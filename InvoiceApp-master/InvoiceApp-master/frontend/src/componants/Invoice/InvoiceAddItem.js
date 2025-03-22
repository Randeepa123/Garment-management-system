import React, { useState, useContext } from "react";
import axios from "axios";
import { InvoiceContex } from "../../contex/InvoiceContex";

export const InvoiceAddItem = () => {
  const [itemName, setItemName] = useState("");
  const [itemTotal, setItemTotal] = useState("");
  const [itemQTY, setItemQTY] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const { refresh, setRefresh, InvoiceNumber } = useContext(InvoiceContex);

  const newItem = {
    product: itemName,
    quantity: parseInt(itemQTY) || 0,
    price: parseFloat(itemPrice) || 0,
    total: parseFloat(itemTotal) || 0, // Should be quantity * price
  };

  const addItemToInvoice = async(e) => {
    e.preventDefault();
    try {
      console.log("Adding item to invoice:", JSON.stringify(newItem));

      const response = await axios.put(
        `http://localhost:8070/invoice/addItem?invoiceId=${InvoiceNumber}`,
        newItem,
        {
          headers: {
            "Content-Type":"application/json",
          },
        }
      );

      console.log(response.data);
      setRefresh(refresh + 1);

      // Clear input fields after successful submission
      setItemName("");
      setItemPrice("");
      setItemQTY("");
      setItemTotal("");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item to invoice!");
    }
  };

  return (
    <div>
      <form className="my-5 invoice-items-form">
        <div className="mb-3">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <label>Item</label>
          </div>
        </div>
        <div className="mb-3">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Price"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            />
            <label>Price</label>
          </div>
        </div>
        <div className="mb-3">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Quantity"
              value={itemQTY}
              onChange={(e) => setItemQTY(e.target.value)}
            />
            <label>QTY</label>
          </div>
        </div>
        <div className="mb-3">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Total"
              value={itemTotal}
              onChange={(e) => setItemTotal(e.target.value)}
            />
            <label>Total</label>
          </div>
        </div>

        <div className="text-end">
          <button type="button" className="btn btn-subtle me-2">
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => addItemToInvoice(e)}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
