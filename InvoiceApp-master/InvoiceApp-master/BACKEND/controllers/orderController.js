const orders = require("../models/order");

const getOrders = (req, res, next) => {
  orders
    .find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOrders = getOrders;
