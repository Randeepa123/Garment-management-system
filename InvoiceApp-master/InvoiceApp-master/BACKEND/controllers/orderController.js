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

const getOrder = (req, res, next) => {
  const jobcardID = Number(req.query.jobcardId);

  orders
    .findOne({ jobcardId: jobcardID })
    .then((order) => {
      res.json(order);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch targets" });
    });
};

exports.getOrders = getOrders;
exports.getOrder = getOrder;
