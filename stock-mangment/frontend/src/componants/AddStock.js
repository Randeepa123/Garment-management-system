import React, { useState } from "react";

const AddStock = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    quantity: "",
    price: "",
    supplier: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8070/api/stock/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Stock added successfully!");
      setFormData({ itemName: "", category: "", quantity: "", price: "", supplier: "" });
    } else {
      alert(data.message);
    }
  };

  return (
    <div>
      <h2>Add Stock</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="itemName" placeholder="Item Name" onChange={handleChange} value={formData.itemName} required />
        <input type="text" name="category" placeholder="Category" onChange={handleChange} value={formData.category} required />
        <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} value={formData.quantity} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} value={formData.price} required />
        <input type="text" name="supplier" placeholder="Supplier (Optional)" onChange={handleChange} value={formData.supplier} />
        <button type="submit">Add Stock</button>
      </form>
    </div>
  );
};

export default AddStock;
