const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Invoice = require("../models/invoice");
const Customer = require("../models/Customer");

router.route("/add").post((req, res) => {
  const invoiceNumber = req.body.invoiceNumber;
  const customerId = req.body.customerId;
  const items = req.body.items;
  const totalAmount = req.body.totalAmount;
  const date = req.body.date;

  const newInvoice = new Invoice({
    invoiceNumber,
    customerId,
    items,
    totalAmount,
    date,
  });

  newInvoice
    .save()
    .then(() => {
      res.json("New Invoice Added!!");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to add invoice" });
    });
});

router.route("/getAll").get((req, res) => {
  const mycustomerId = req.query.customerId; 

  // Check if the customerId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(mycustomerId)) {
    return res.status(400).json({ message: "Invalid customer ID" });
  }


  Invoice.find({ customerId: mycustomerId })
    .then((invoices) => {
      if (invoices.length === 0) {
        return res.json({ foundInvoices: false });
      }
      res.json(invoices); 
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch invoices" });
    });
});

router.route("/addItem").put((req, res) => {
  const { product, quantity, price, total } = req.body;
  const invoiceId = req.query.invoiceId; 

  Invoice.findOne({ invoiceNumber: invoiceId })
    .then((invoice) => {
      if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }

      // Push the new item to the items array
      invoice.items.push({
        product: product,
        quantity: quantity,
        price: price,
        total: total,
      });

      invoice.totalAmount += total;


      invoice
        .save()
        .then(() => {
          res.json("Item added to the invoice!");
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "Failed to update invoice" });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to find invoice" });
    });
});

router.route("/getInvoice").get((req, res) => {
  const invoiceId = req.query.invoiceId; 

  
  Invoice.findOne({ invoiceNumber: invoiceId })
    .populate("customerId")
    .then((invoice) => {
      if (!invoice) {
        return res.json({ foundInvoices: false });
      }
      res.json(invoice); 
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch invoice" });
    });
});

// DELETE an item from the invoice
router.route("/deleteItem").delete((req, res) => {
  const { invoiceId, itemId } = req.query; 
  
  Invoice.findOne({ invoiceNumber: invoiceId })
    .then((invoice) => {
      if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }

      
      invoice.items = invoice.items.filter(item => item._id.toString() !== itemId);


      invoice.totalAmount = invoice.items.reduce((sum, item) => sum + item.total, 0);


      invoice
        .save()
        .then(() => {
          res.json("Item deleted successfully!");
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "Failed to delete item" });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to find invoice" });
    });
});

// PUT to update an existing item
router.route("/updateItem").put((req, res) => {
  const { invoiceId, itemId, product, price, quantity, total } = req.body;
  
  
  Invoice.findOne({ invoiceNumber: invoiceId })
    .then((invoice) => {
      if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }

      
      const item = invoice.items.id(itemId);
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }

   
      item.product = product;
      item.price = price;
      item.quantity = quantity;
      item.total = total;

      invoice.totalAmount = invoice.items.reduce((sum, item) => sum + item.total, 0);

     
      invoice
        .save()
        .then(() => {
          res.json("Item updated successfully!");
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "Failed to update item" });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to find invoice" });
    });
});


module.exports = router;
