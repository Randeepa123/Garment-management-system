import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { InvoiceContex } from "../../contex/InvoiceContex";

export const InvoiceAddItem = ({ editingItem, setEditingItem }) => {
  const [itemName, setItemName] = useState("");
  const [itemQTY, setItemQTY] = useState("");
  const [itemDiscount, setDiscount] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const { refresh, setRefresh, InvoiceNumber } = useContext(InvoiceContex);



  const total = ((parseFloat(itemPrice) || 0) * (parseInt(itemQTY) || 0) ) - itemDiscount ;
  
 

  useEffect(() => {
    if (editingItem) {
      setItemName(editingItem.product);
      setItemQTY(editingItem.quantity.toString());
      setItemPrice(editingItem.price.toString());
      setDiscount(editingItem.Discount.toString());
    } else {
   
      setItemName("");
      setItemQTY("");
      setItemPrice("");
      setDiscount("");
    }
  }, [editingItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      product: itemName,
      quantity: parseInt(itemQTY) || 0,
      price: parseFloat(itemPrice) || 0,
      Discount: (itemDiscount) ,
      total: total,
    };

    try {
      if (editingItem) {
       
        await axios.put(
          "http://localhost:8070/invoice/updateItem",
          {
            invoiceId: InvoiceNumber,
            itemId: editingItem._id,
            ...newItem,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert("Item updated successfully!");
        setEditingItem(null); 
      } else {
   
        await axios.put(
          `http://localhost:8070/invoice/addItem?invoiceId=${InvoiceNumber}`,
          newItem,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
       
      }

      setRefresh(refresh + 1);
      
      setItemName("");
      setItemPrice("");
      setItemQTY("");
      setDiscount("");
    } catch (error) {
   
      alert("Failed to add/update item!");
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
              required
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
              required
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
              required
            />
            <label>QTY</label>
          </div>
        </div>
        <div className="mb-3">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Discount"
              value={itemDiscount}
              onChange={(e) => setDiscount(e.target.value)}
              required
            />
            <label>Discount</label>
          </div>
        </div>
        <div className="mb-3">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Total"
              value={total}
              disabled
              required
            />
            <label>Total</label>
          </div>
        </div>

        <div className="text-end">
          <button
            type="button"
            className="btn btn-subtle me-2"
            onClick={() => {
              
              setEditingItem(null);
              setItemName("");
              setItemQTY("");
              setDiscount("");
              setItemPrice("");
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => handleSubmit(e)}
          >
            {editingItem ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};
