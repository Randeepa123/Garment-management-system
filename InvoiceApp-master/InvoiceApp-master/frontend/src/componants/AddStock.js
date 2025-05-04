import React, { useState } from "react";
import "./css/AddStock.css";

const AddStock = () => {
  const [categories, setCategories] = useState({
    Fabrics: ["Cotton", "Polyester", "Silk", "Wool", "Denim"],
    "Trims & Accessories": ["Zippers", "Buttons", "Elastic Bands", "Hooks & Eyelets", "Labels & Tags"],
    "Lining & Padding Materials": ["Polyester Lining", "Cotton Lining", "Quilted Padding", "Foam Padding", "Mesh Lining"],
    "Decorative & Functional Add-ons": ["Lace", "Sequins", "Beads", "Studs & Rivets", "Reflective Tapes"],
  });

  const [formData, setFormData] = useState({
    category: "",
    itemName: "",
    quantity: "",
    price: "",
    supplier: "",
    supplierCountry: "",
  });

  const [newCategory, setNewCategory] = useState("");
  const [newItem, setNewItem] = useState("");

  
  const handleStockChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8070/api/stock/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Stock added successfully!");
        setFormData({ category: "", itemName: "", quantity: "", price: "", supplier: "" , supplierCountry: "" });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding stock:", error);
      alert("An error occurred while adding stock.");
    }
  };

 
  const handleAddMaterial = () => {
    if (!newCategory) {
      alert("Please enter a category first!");
      return;
    }
    if (!newItem) {
      alert("Please enter an item name for the category!");
      return;
    }

    setCategories((prev) => ({
      ...prev,
      [newCategory]: [...(prev[newCategory] || []), newItem],
    }));

    setNewCategory("");
    setNewItem("");
    alert("Material added successfully!");
  };

  return (
    <div className="add-stock-container">
      <h2>Add Stock</h2>

     
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category:</label>
          <select name="category" value={formData.category} onChange={handleStockChange} required>
            <option value="">Select Category</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Item Name:</label>
          <select name="itemName" value={formData.itemName} onChange={handleStockChange} required disabled={!formData.category}>
            <option value="">Select Item</option>
            {categories[formData.category]?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Quantity:</label>
          <input type="number" name="quantity" placeholder="Quantity" onChange={handleStockChange} value={formData.quantity} required />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input type="number" name="price" placeholder="Price" onChange={handleStockChange} value={formData.price} required />
        </div>

        <div className="form-group">
          <label>Supplier (Optional):</label>
          <input type="text" name="supplier" placeholder="Supplier" onChange={handleStockChange} value={formData.supplier} />
        </div>

        <div className="form-group">
          <label>Supplier country :</label>
          <input type="text" name="supplierCountry" placeholder="Supplier country" onChange={handleStockChange} value={formData.supplierCountry} />
        </div>

        <button className="button_ishan" type="submit">Add Stock</button>
      </form>

      <hr />

   
      <h2>Add New Material</h2>

      <div className="form-group">
        <label>New Category:</label>
        <input type="text" placeholder="Enter Category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
      </div>

      <div className="form-group">
        <label>New Item Name:</label>
        <input type="text" placeholder="Enter Item Name" value={newItem} onChange={(e) => setNewItem(e.target.value)} disabled={!newCategory} />
      </div>

      <button className ="button_ishan" onClick={handleAddMaterial}>Add New Material</button>
    </div>
  );
};

export default AddStock;

