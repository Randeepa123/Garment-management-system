const mongoose = require("mongoose");
const Customer = require("../models/customer");
const {response} = require("../app/customer_app");


const addCustomer = (req, res,next) => {
  const { id, name, email, phone, address } = req.body;

  const newCustomer = new Customer({
    id,
    name,
    email,
    phone,
    address,
  });

  newCustomer
    .save()
    .then(() => {
      res.json("New Customer Added!!");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to add customer" });
    });
};

const getAllCustomers = (req, res,next) => {
  Customer.find()
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch customers" });
    });
};



exports.addCustomer = addCustomer;
exports.getAllCustomers = getAllCustomers;