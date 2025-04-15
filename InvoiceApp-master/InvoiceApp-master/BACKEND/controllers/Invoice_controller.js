const { response } = require("../app/Invoice_app");
const Invoice = require("../models/invoice");
const mongoose = require("mongoose");

const addInvoice = (req, res, next) => {
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
};

const getAllInvoices = (req, res, next) => {
  const mycustomerId = req.query.customerId;

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
};

const getInvoice = (req, res, next) => {
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
};

const addItemToInvoice = (req, res, next) => {
  const { product, quantity, price, Discount, total } = req.body;
  const invoiceId = req.query.invoiceId;

  Invoice.findOne({ invoiceNumber: invoiceId })
    .then((invoice) => {
      if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }

      invoice.items.push({
        product,
        quantity,
        price,
        Discount,
        total,
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
};

const deleteItemFromInvoice = (req, res, next) => {
  const { invoiceId, itemId } = req.query;

  Invoice.findOne({ invoiceNumber: invoiceId })
    .then((invoice) => {
      if (!invoice) {
        return res.status(404).json({ error: "Invoice not found" });
      }

      invoice.items = invoice.items.filter(
        (item) => item._id.toString() !== itemId
      );

      invoice.totalAmount = invoice.items.reduce(
        (sum, item) => sum + item.total,
        0
      );

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
};

const updateItemInInvoice = (req, res, next) => {
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

      invoice.totalAmount = invoice.items.reduce(
        (sum, item) => sum + item.total,
        0
      );

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
};

exports.addInvoice = addInvoice;
exports.getAllInvoices = getAllInvoices;
exports.getInvoice = getInvoice;
exports.addItemToInvoice = addItemToInvoice;
exports.deleteItemFromInvoice = deleteItemFromInvoice;
exports.updateItemInInvoice = updateItemInInvoice;
